import {
    Component,
    OnInit
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Github} from "../services/github";

@Component({
    selector: 'repository',
    providers: [
    ],
    templateUrl: './repository.component.html'
})
export class RepositoryComponent implements OnInit
{
    public repositoryName: string = null;
    public userName: string = null;
    public repository: any = null;

    constructor(private route: ActivatedRoute, private github: Github){}

    public ngOnInit() {
        console.log('hello `Repository` component');

        this.repositoryName = this.route.snapshot.params['repo'];
        this.userName = this.route.snapshot.params['user'];

        this.getRepository();
    }

    public getRepository()
    {
        this.github.getRepository(this.userName, this.repositoryName)
            .then((response: any) => {
                this.repository = response;
            });
    }

}
