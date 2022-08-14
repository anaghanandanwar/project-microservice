import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectResolver {
    constructor(private readonly projectService: ProjectService) { }

    @Mutation(() => Project, { name: 'createProject' })
    createProject(@Args('project') project: CreateProjectInput) {
        return this.projectService.create(project);
    }

    @Query(() => [Project], { name: 'getAllProject' })
    findAll() {
        return this.projectService.findAll();
    }

    @Query(() => Project, { name: 'getProjectById' })
    findOne(@Args('id') id: string) {
        return this.projectService.findOne(id);
    }

    @Mutation(() => Project)
    updateProject(@Args('project') project: UpdateProjectInput) {
        return this.projectService.update(project.id, project);
    }

    @Mutation(() => Project)
    removeProject(@Args('id', { type: () => Int }) id: number) {
        return this.projectService.remove(id);
    }

    @ResolveReference()
    resolvereferance(ref: { __typename: string, id: string }) {
        return this.projectService.findOne(ref.id);
    }
}
