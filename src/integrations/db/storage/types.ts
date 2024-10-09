export type Publication = {
  id: number;
  title: string;
  description: string;
  status: 'public' | 'private';
  tagids: Tags['id'][];
};

export type Tags = {
  id: number;
  title: string;
};

export type PublicationTag = {
  id: number;
  publication_id: Publication['id'];
  tag_id: Tags['id'];
};

export type Accaunt = {
  id: number;
  login: string;
  password: string;
  role: 'user';
};
