import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookEditingComponent } from '../book-editing/book-editing.component';
import { Book } from '../model/book';
import { User } from '../model/user';
import { Comment } from '../model/comments';
import { CommentService } from '../services/comment.service';
import { MainService } from '../services/main.service';
import { TakeService } from '../services/take.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router, private takeService: TakeService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    if (this.current == null) {
      this.router.navigate(['']);
    }

    this.mainService.getTop().subscribe((data: Book[]) => {
      data.find(element => {
        if (element.title == localStorage.getItem('ClickedBook')) {
          this.clicked = element;
        }
        if (this.current && this.clicked) {
          this.commentService.canComment(this.clicked, this.current).subscribe(resp => {
            if (resp['message'] == 'true') {
              this.can = true;
            } else {
              this.can = false;
            }
          })
          this.commentService.getAll(this.clicked).subscribe((comm: Comment[]) => {
            this.comments = comm;
            if (comm.length!=0){
              this.hasComments = true;
            }
            console.log(comm);
            this.comments.sort((a, b) => {
              return a.date > b.date ? -1 : 1;
            })
          })
        }
      })

    })
  }

  clicked: Book;
  current: User;
  message: String;

  borrow() {
    if (localStorage.getItem('flag') == 'false') {
      this.message = "Have books whit expired deadline, need to give them back first in order to get a new one";
    } else {
      this.takeService.take(this.clicked, this.current).subscribe(resp => {
        if (resp['message'] == 'ok') {
          this.message = 'ok';
        } else if (resp['message'] == '3 taken') {
          this.message = 'exited limit';
        } if (resp['message'] == 'already taken') {
          this.message = 'already taken and not returned';
        } else {
          this.message = 'error'; //mozda pod komentar ispisa mi error u jednom trenutku? a uzeo lepo knjigu

        }
      });
    }
  }

  isModerator() {
    if (this.current.type == 2 || this.current.type == 1) {
      return true;
    } else {
      return false;
    }
  }

  editData() {
    // getNewBook();
    this.router.navigate(['/editBook']);
  }

  can: Boolean;
  grade: number;
  comment: string;
  canComment() {
    return this.can;
  }

  addComment() {
    this.commentService.addComment(this.comment, this.grade, this.current, this.clicked).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.can = false;
        this.ngOnInit();
      } else {
        this.can = true;
      }
    })
  }

  comments: Comment[] = [];
  hasComments: Boolean = false;
  
  myComment(comm: Comment){
    return comm.user == this.current.username;
  }

  edit(comm:Comment){
    comm.comment = this.comment != undefined ? this.comment : comm.comment;
    let old_grade = comm.grade;
    comm.grade = this.grade != NaN ? this.grade : comm.grade;
    comm.edited = true;
    console.log("Edit comment: ", comm);
    this.commentService.editComment(comm.comment, comm.grade, comm.user, comm.book, comm.edited, old_grade).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.can = false;
        this.ngOnInit();
      } else {
        this.can = true;
      }
    })
    console.log("Edit comment: ", comm);
  }
  
  hasPhoto(user: Book){
    if (user.photo=="")
      return false;
    else {
      return true;
    }
  }

  blocked(user: User){
    if (user.blocked == null) {
      return false;
    }
    return user.blocked;
  }

  convertDate(date : number){
    return  new Date(date).toLocaleString('en-US');
  }
}
