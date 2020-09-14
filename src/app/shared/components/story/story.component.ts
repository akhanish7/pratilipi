import { Component, OnInit } from '@angular/core';
import { Story } from '../../../story';
import { StoriesService } from '../../services/stories.service';
import * as io from 'socket.io-client';
import { ActivatedRoute, Router } from '@angular/router';

import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  story: Story;
  title: string;
  content: string;
  readCount: number;
  socket;
  activeUsers: number;
  socketConnectionUrl: string = 'http://localhost:7777';
  constructor(
    private storyService: StoriesService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.getActiveUsers();
  }

  getStory() {
    this.storyService
      .getStory(this.activatedRoute.snapshot.params.id)
      .subscribe(
        (story) => {
          this.getActiveUsers();
          this.story = story;
          this.title = this.story.title;
          this.content = this.story.content;
          this.readCount = this.readCount;
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
              console.error('Error Event');
            } else {
              console.log(`error status : ${error.status} ${error.statusText}`);
              switch (error.status) {
                case 403: //Wrong Token
                  this.router.navigateByUrl('/');
                  break;
              }
            }
          } else {
            console.error('some thing else happened');
          }
          return throwError(error);
        }
      );
  }

  async getActiveUsers() {
    this.socket = io(this.socketConnectionUrl);
    await this.socket.on('counter', (data: any) => {
      this.activeUsers = data.count;
    });
  }

  ngOnInit(): void {
    this.getStory();
    this.getActiveUsers();
  }
}
