import { FormEvent, useMemo, useState } from 'react';
import { createSourceConversation, type SourceConversation } from '../../lib/sourceConversations';
import { formatReadableDate } from '../../lib/dateFormat';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { InfoCard } from '../ui/InfoCard';
import { MetadataChip } from '../ui/MetadataChip';

type SourceConversationPanelProps = {
  projectId: string;
  sourceConversations: SourceConversation[];
  isLoading: boolean;
  error: string;
  onSourceConversationSaved: (sourceConversation: SourceConversation) => void;
};

export function SourceConversationPanel({
  projectId,
  sourceConversations,
  isLoading,
  error,
  onSourceConversationSaved,
}: SourceConversationPanelProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedSourceConversationId, setSelectedSourceConversationId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const selectedSourceConversation = useMemo(() => {
    return sourceConversations.find((sourceConversation) => sourceConversation.id === selectedSourceConversationId) ?? sourceConversations[0] ?? null;
  }, [selectedSourceConversationId, sourceConversations]);

  async function handleSaveSourceConversation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setFormError('');

    if (!content.trim()) {
      setFormError('Conversation content is required.');
      return;
    }

    setIsSaving(true);

    try {
      const savedSourceConversation = await createSourceConversation({ projectId, title, content });
      onSourceConversationSaved(savedSourceConversation);
      setSelectedSourceConversationId(savedSourceConversation.id);
      setTitle('');
      setContent('');
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : 'Unable to save source conversation.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="mt-10 border border-outline-variant bg-surface-container-low p-10">
      <div className="mb-8 flex items-start justify-between gap-8">
        <div>
          <span className="metadata text-[10px] text-on-surface-variant">SOURCE CONVERSATIONS</span>
          <h2 className="mt-4 font-display text-4xl leading-tight text-primary">Paste one AI product conversation</h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-on-surface-variant">
            Save the raw conversation first. Extraction, Product Brief updates, tickets, and code evidence stay out of this build slice.
          </p>
        </div>
        <MetadataChip variant="outline">{sourceConversations.length} saved</MetadataChip>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <form className="col-span-5 flex flex-col gap-5" onSubmit={handleSaveSourceConversation}>
          <div>
            <label className="metadata mb-2 block text-[10px] text-on-surface-variant" htmlFor="source-conversation-title">
              TITLE OPTIONAL
            </label>
            <input
              id="source-conversation-title"
              className="w-full border border-outline-variant bg-surface px-4 py-3 font-body text-sm text-primary outline-none transition-colors focus:border-primary"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="ChatGPT product planning thread"
            />
          </div>

          <div>
            <label className="metadata mb-2 block text-[10px] text-on-surface-variant" htmlFor="source-conversation-content">
              CONVERSATION CONTENT
            </label>
            <textarea
              id="source-conversation-content"
              className="min-h-80 w-full resize-y border border-outline-variant bg-surface px-4 py-3 font-body text-sm leading-6 text-primary outline-none transition-colors focus:border-primary"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Paste the full AI product conversation here..."
            />
          </div>

          {formError ? <p className="text-sm leading-6 text-on-surface-variant">{formError}</p> : null}

          <Button variant="primary" icon="save" type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Source Conversation'}
          </Button>
        </form>

        <div className="col-span-7 flex flex-col gap-6">
          <InfoCard title="Saved Source Conversations" className="h-full">
            {isLoading ? (
              <p className="metadata text-on-surface-variant">LOADING SOURCE CONVERSATIONS...</p>
            ) : error ? (
              <div>
                <MetadataChip>Needs review</MetadataChip>
                <p className="mt-6 text-sm leading-6 text-on-surface-variant">{error}</p>
              </div>
            ) : sourceConversations.length === 0 ? (
              <div>
                <MetadataChip>Empty</MetadataChip>
                <p className="mt-6 text-sm leading-6 text-on-surface-variant">
                  No source conversations saved yet. Paste a conversation and save it to preserve the original product thinking.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {sourceConversations.map((sourceConversation) => {
                  const isSelected = sourceConversation.id === selectedSourceConversation?.id;

                  return (
                    <button
                      key={sourceConversation.id}
                      type="button"
                      onClick={() => setSelectedSourceConversationId(sourceConversation.id)}
                      className={`w-full border px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? 'border-primary bg-surface-container text-primary'
                          : 'border-outline-variant bg-surface text-on-surface-variant hover:border-primary hover:text-primary'
                      }`}
                    >
                      <span className="metadata block text-[10px]">{formatReadableDate(sourceConversation.created_at)}</span>
                      <span className="mt-2 block font-display text-2xl leading-tight">{sourceConversation.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </InfoCard>

          {selectedSourceConversation ? (
            <article className="border border-outline-variant bg-surface p-6">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <span className="metadata text-[10px] text-on-surface-variant">OPEN SOURCE</span>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-primary">{selectedSourceConversation.title}</h3>
                </div>
                <span className="metadata flex items-center gap-2 text-[10px] text-on-surface-variant">
                  <Icon name="calendar_today" size={16} />
                  {formatReadableDate(selectedSourceConversation.created_at)}
                </span>
              </div>
              <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap border border-outline-variant bg-surface-container-low p-5 font-body text-sm leading-6 text-on-surface-variant">
                {selectedSourceConversation.content}
              </pre>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
