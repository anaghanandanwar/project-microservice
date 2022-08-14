import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) { }
    create(project: CreateProjectInput): Promise<Project> {
        let proj = this.projectRepository.create(project)
        return this.projectRepository.save(proj)
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find(
            // {
            //     relations: ["employees"]
            // }
        );
    }

    async findOne(id: string): Promise<Project> {
        return await this.projectRepository.findOneBy({id});
    }

    update(id: string, updateProjectInput: UpdateProjectInput) {
        let proj: Project = this.projectRepository.create(updateProjectInput)
        proj.id = id
        return this.projectRepository.save(proj)
    }

    remove(id: number) {
        return `This action removes a #${id} project`;
    }
}
