import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../entities/news.entity';
import { Repository } from 'typeorm';
import { NewsDTO } from '../models/news.dto';
import { User } from '@app/security/users/user.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async findNews(): Promise<News[]> {
          const newsFinded = await this.newsRepository.find();
          return newsFinded;
      }

      async findOneNews(id: number): Promise<News> {
        const newsFinded = await this.newsRepository.findOne({
          where: { id },
          relations: ['author'],
        });
        return newsFinded;
      }

      async createNews(news: NewsDTO, userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const newsToCreate = await this.newsRepository.create({ ...news, author: user });
        return await this.newsRepository.save(newsToCreate);
      }

      async deleteNews(id: number, userId: number) {
        const newsToDelete = await this.newsRepository.findOne({
          where: { id },
          relations: ['author'],
        });
        if (!newsToDelete) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        if (newsToDelete.author.id !== userId) {
          throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
        }
        return await this.newsRepository.delete({ id });
      }

      async updateNews(idNews: number, newsToUpdate: NewsDTO) {}

      async voteNews() {}
}
