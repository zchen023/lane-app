create table if not exists public.source_conversations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Untitled source conversation',
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint source_conversations_title_not_blank check (length(btrim(title)) > 0),
  constraint source_conversations_content_not_blank check (length(btrim(content)) > 0)
);

create index if not exists source_conversations_project_id_created_at_idx
  on public.source_conversations (project_id, created_at desc);

create index if not exists source_conversations_user_id_created_at_idx
  on public.source_conversations (user_id, created_at desc);

alter table public.source_conversations enable row level security;

drop policy if exists "Users can view their own source conversations" on public.source_conversations;
create policy "Users can view their own source conversations"
  on public.source_conversations
  for select
  using (
    auth.uid() = user_id
    and exists (
      select 1
      from public.projects
      where projects.id = source_conversations.project_id
        and projects.user_id = auth.uid()
    )
  );

drop policy if exists "Users can insert their own source conversations" on public.source_conversations;
create policy "Users can insert their own source conversations"
  on public.source_conversations
  for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.projects
      where projects.id = source_conversations.project_id
        and projects.user_id = auth.uid()
    )
  );

drop policy if exists "Users can update their own source conversations" on public.source_conversations;
create policy "Users can update their own source conversations"
  on public.source_conversations
  for update
  using (
    auth.uid() = user_id
    and exists (
      select 1
      from public.projects
      where projects.id = source_conversations.project_id
        and projects.user_id = auth.uid()
    )
  )
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.projects
      where projects.id = source_conversations.project_id
        and projects.user_id = auth.uid()
    )
  );

drop policy if exists "Users can delete their own source conversations" on public.source_conversations;
create policy "Users can delete their own source conversations"
  on public.source_conversations
  for delete
  using (
    auth.uid() = user_id
    and exists (
      select 1
      from public.projects
      where projects.id = source_conversations.project_id
        and projects.user_id = auth.uid()
    )
  );
