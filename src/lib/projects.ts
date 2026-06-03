import { supabase } from './supabaseClient';

export type Project = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CreateProjectInput = {
  name: string;
  description?: string;
};

const projectSelect = 'id, user_id, name, description, created_at, updated_at';

async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error('Sign in before working with Lane projects.');
  }

  return user.id;
}

export async function listProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(projectSelect)
    .order('updated_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProjectById(projectId: string) {
  const { data, error } = await supabase.from('projects').select(projectSelect).eq('id', projectId).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createProject({ name, description }: CreateProjectInput) {
  const trimmedName = name.trim();
  const trimmedDescription = description?.trim() ?? '';

  if (!trimmedName) {
    throw new Error('Project name is required.');
  }

  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      name: trimmedName,
      description: trimmedDescription ? trimmedDescription : null,
    })
    .select(projectSelect)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProject(projectId: string) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', userId)
    .select(projectSelect)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Project not found or you do not have access to delete it.');
  }

  return data;
}
