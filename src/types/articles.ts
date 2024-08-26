import { AiModels } from './aiModels';

export interface IArticlesRequestQuery {
  topic: string;
  page: string;
  model: AiModels;
}
