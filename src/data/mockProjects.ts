export type WorkspaceSection = {
  title: string;
  description: string;
  status: string;
  icon: string;
};

export type LaneProject = {
  id: string;
  name: string;
  type: string;
  status: string;
  lastUpdated: string;
  sourceConversations: number;
  tickets: number;
  codeEvidence: string;
  description: string;
  sections: WorkspaceSection[];
};

export const mockProjects: LaneProject[] = [
  {
    id: 'lane-1-0-mvp',
    name: 'Lane 1.0 MVP',
    type: 'Builder Context Layer',
    status: 'Active',
    lastUpdated: 'Today',
    sourceConversations: 0,
    tickets: 1,
    codeEvidence: 'Not connected',
    description:
      'A focused Lane workspace for turning messy AI product conversations into structured intent, lightweight execution artifacts, and implementation evidence.',
    sections: [
      {
        title: 'Source Conversations',
        description: 'Imported AI product conversations will live here before extraction.',
        status: 'Empty',
        icon: 'description',
      },
      {
        title: 'Product Brief',
        description: 'The living product brief will collect approved product truth and suggested updates.',
        status: 'Not started',
        icon: 'article',
      },
      {
        title: 'Product Context',
        description: 'Structured summary of users, painful moments, goals, constraints, and scope boundaries.',
        status: 'Not started',
        icon: 'hub',
      },
      {
        title: 'Feature Map',
        description: 'Feature areas extracted from source conversations will be grouped here.',
        status: 'Not started',
        icon: 'account_tree',
      },
      {
        title: 'Tickets / Specs',
        description: 'Lightweight tickets and build specs will connect product intent to execution.',
        status: '1 ticket',
        icon: 'fact_check',
      },
      {
        title: 'Code Evidence',
        description: 'GitHub or codebase snapshot evidence will appear here after connection.',
        status: 'Not connected',
        icon: 'code_blocks',
      },
      {
        title: 'Built vs Missing',
        description: 'Evidence-based implementation status will show what exists, what is missing, and what needs review.',
        status: 'Waiting for code evidence',
        icon: 'rule',
      },
    ],
  },
];
