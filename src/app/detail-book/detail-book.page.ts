import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {
  bookId: string;
  book: { id: ' '; title: ' '; cover: ' '; description: ' ' };
  constructor(private route: ActivatedRoute) {
    this.bookId = this.route.snapshot.params['id'];
    this.book = { id: ' ', title: ' ', cover: ' ', description: ' ' };
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.bookId = params['id'];
    });
    this.detail(this.bookId);
  }

  async detail(id_book: string) {
    try {
      const response = await CapacitorHttp.request({
        url: `http://192.168.43.40/collection-book-api/get-data-by-id.php?id=${id_book}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      this.book = response.data[0];
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error', error);
    }
  }
}
