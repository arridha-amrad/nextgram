import { StoriesTable } from "../schema";
import BaseService from "./BaseService";

export default class StoryService extends BaseService {
  public async create(data: typeof StoriesTable.$inferInsert) {
    const result = await this.db.insert(StoriesTable).values(data);
    return result;
  }
}
