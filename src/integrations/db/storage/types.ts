export type Publication = {
  id: number;
  title: string;
  description: string;
  status: 'public' | 'private';
};

export type Tags = {
  id: number;
  title: string;
};
