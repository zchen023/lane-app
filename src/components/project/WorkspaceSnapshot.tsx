import { InfoCard } from '../ui/InfoCard';

type WorkspaceSnapshotProps = {
  sourceConversationCount: number;
};

export function WorkspaceSnapshot({ sourceConversationCount }: WorkspaceSnapshotProps) {
  return (
    <InfoCard title="Workspace Snapshot">
      <div className="flex flex-col gap-6">
        <div>
          <span className="metadata text-[10px] text-on-surface-variant">SOURCE CONVERSATIONS</span>
          <p className="mt-2 font-display text-2xl text-primary">{sourceConversationCount}</p>
        </div>
        <div className="border-t border-outline-variant pt-6">
          <span className="metadata text-[10px] text-on-surface-variant">TICKETS</span>
          <p className="mt-2 font-display text-2xl text-primary">0</p>
        </div>
        <div className="border-t border-outline-variant pt-6">
          <span className="metadata text-[10px] text-on-surface-variant">CODE EVIDENCE</span>
          <p className="mt-2 font-display text-2xl text-primary">Not connected</p>
        </div>
      </div>
    </InfoCard>
  );
}
