import {
    Component,
    OnInit
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'repository',
    providers: [
    ],
    templateUrl: './repository.component.html'
})
export class RepositoryComponent implements OnInit
{
    public repositoryId: string = null;

    constructor(private route: ActivatedRoute){}

    public ngOnInit() {
        console.log('hello `Repository` component');

        console.log(this.route.snapshot);
        this.repositoryId = this.route.snapshot.params['id'];
    }

}
