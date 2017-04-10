import {
    Component,
    OnInit,
    Input,
    Output, EventEmitter
} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Github} from "../services/github";

@Component({
    selector: 'pagination',
    providers: [
    ],
    templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit
{
    @Input()
    public numberOfPages: number = 5;

    @Input()
    public currentPage: number = 1;

    @Output()
    public currentPageEmitter: EventEmitter<number> = new EventEmitter<number>();

    constructor(private route: ActivatedRoute){}

    public ngOnInit() {
        console.log('hello `Pagination` component');
    }

    public onPageClicked(page)
    {
        this.currentPage = page;

        this.currentPageEmitter.emit(this.currentPage);

        return false;
    }

    public createRange(number: number){
        let items: number[] = [];
        for(let i = 1; i <= number; i++){
            items.push(i);
        }
        return items;
    }
}
