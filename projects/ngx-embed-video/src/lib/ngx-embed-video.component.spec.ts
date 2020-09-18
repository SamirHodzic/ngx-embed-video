import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEmbedVideoComponent } from './ngx-embed-video.component';

describe('NgxEmbedVideoComponent', () => {
  let component: NgxEmbedVideoComponent;
  let fixture: ComponentFixture<NgxEmbedVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxEmbedVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEmbedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
