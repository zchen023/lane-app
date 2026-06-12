import { supabase } from './supabaseClient';

export const fallbackSourceConversationTitle = 'Untitled source conversation';

export type SourceConversation = {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string | null;
  updated_at: string | null;
};

export type CreateSourceConversationInput = {
  projectId: string;
  title?: string;
  content: string;
};

const sourceConversationSelect = 'id, project_id, user_id, title, content, created_at, updated_at';

async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error('Sign in before working with source conversations.');
  }

  return user.id;
}

export async function listSourceConversations(projectId: string) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('source_conversations')
    .select(sourceConversationSelect)
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createSourceConversation({ projectId, title, content }: CreateSourceConversationInput) {
  const userId = await getCurrentUserId();
  const trimmedTitle = title?.trim() ?? '';
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error('Conversation content is required.');
  }

  const { data, error } = await supabase
    .from('source_conversations')
    .insert({
      project_id: projectId,
      user_id: userId,
      title: trimmedTitle || fallbackSourceConversationTitle,
      content: trimmedContent,
    })
    .select(sourceConversationSelect)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
