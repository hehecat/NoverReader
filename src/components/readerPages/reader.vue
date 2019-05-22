<template>
  <transition name="readerslide">
    <div class="reader-container"
         @touchstart="checkStart"
         @touchmove="checkmove"
         @touchend="oprationAction">
      <reader-content :bookContent='chapterContent'
                      :Title="Title"></reader-content>
      <reader-menu @prev="chapterUp"
                   @next="chapterDown"
                   :isMenuShow="ismenushow"
                   :Now="currentChapter+1"
                   :Total="Total"></reader-menu>
      <reader-catalog @ChangeChapter="goChapter"
                      :catlog="chapters"
                      :Total="Total"></reader-catalog>
    </div>
  </transition>
</template>
<script type="text/javascript">
import readercontent from './reader-content'
import readermenu from './reader-menu'
import readercatalog from './reader-catalog'
import { Indicator, MessageBox, Toast } from 'mint-ui'
import util from '../../api/util'
import { getBookChapters, getBookChapter } from '../../api/api'

export default {
  beforeRouteLeave (to, from, next) {
    let localShelf = util.getLocalData('myfollowbook') ? util.getLocalData('myfollowbook') : {};
    if (!localShelf[this.$route.params.bookid]) {
      MessageBox.confirm('是否加入收藏', '加入收藏').then(() => {
        localShelf[this.$route.params.bookid] = {
          cover: this.$store.state.BookInfo.cover,
          title: this.$store.state.BookInfo.novel_name,
          lastChapter: this.currentChapter,
          position: document.getElementById('reader-page-view').scrollTop,
        }
        util.setLocalData('myfollowbook', localShelf);
        next();
      }).catch(() => {
        next();
      })
      util.setLocalData('myfollowbook', localShelf);
    } else {
      let book = localShelf[this.$route.params.bookid];
      book.lastChapter = this.currentChapter;
      book.position = document.getElementById('reader-page-view').scrollTop;
    }
    util.setLocalData('myfollowbook', localShelf);
    next();
  },
  data () {
    return {
      bookinfo: {},
      ismenushow: false,
      ismove: false,
      chapters: {},
      currentChapter: 0,
      chapterContent: {},
      Title: '',
      Total: 0,
      startX: [],
      X: 0,
    }
  },
  components: {
    'reader-content': readercontent,
    'reader-menu': readermenu,
    'reader-catalog': readercatalog
  },
  created () {
    this.getChapters();
  },
  watch: {
    'currentChapter': 'getChapterContent',
  },
  methods: {
    getChapters () {
      Indicator.open();
      let localShelf = util.getLocalData('myfollowbook') ? util.getLocalData('myfollowbook') : {};
      let book = localShelf[this.$route.params.bookid];
      let bookname = '未知';
      if (book != null) {
        bookname = book.title;
      } else {
        this.BookInfo = this.$store.state.BookInfo;
        bookname = this.BookInfo['novel_name'];
      }
      getBookChapters(bookname).then(res => {
        this.chapters = res.data;
        this.currentChapter = localShelf && localShelf[this.$route.params.bookid] && localShelf[this.$route.params.bookid].lastChapter ? localShelf[this.$route.params.bookid].lastChapter : 0;
        this.getChapterContent();
      })
    },
    getChapterContent () {
      let chapterId = this.chapters[this.currentChapter]._id;
      let localShelf = util.getLocalData('myfollowbook') ? util.getLocalData('myfollowbook') : {};
      let book = localShelf[this.$route.params.bookid];
      let bookname = '未知';
      if (book != null) {
        bookname = book.title;
      } else {
        this.BookInfo = this.$store.state.BookInfo;
        bookname = this.BookInfo['novel_name'];
      }
      getBookChapter(bookname, chapterId).then(res => {
        this.chapterContent = res.data.content;
        this.Title = this.chapters[this.currentChapter].section_name;
        this.Total = this.chapters.length - 1;
        this.$nextTick(() => {
          document.getElementById('reader-page-view').scrollTop = localShelf[this.$route.params.bookid] ? localShelf[this.$route.params.bookid].position : 0;
        });
        Indicator.close();
      }).catch(err => {
        // console.log(err)
        Toast('获取章节失败')
        Indicator.close();
      })
    },
    checkStart (el) {
      this.ismove = false;
      this.startX = el.changedTouches[0].pageX;
    },
    checkmove (el) {
      this.ismove = true;
      let moveEndX = el.changedTouches[0].pageX;
      this.X = moveEndX - this.startX;
    },
    oprationAction (el) {
      let view = document.getElementById('reader-page-view');
      let screenHeight = document.body.clientHeight;
      let screenWidth = document.body.clientWidth;
      let Wside = screenWidth / 3;
      let Hside = screenHeight / 3;
      if (!this.ismove) {
        // console.log(view.scrollTop);

        let touchPointX = el.changedTouches[0].pageX;
        let touchPointY = el.changedTouches[0].pageY;
        if (touchPointX > 0 && touchPointX < Wside && this.ismenushow == false) {
          this.ismenushow = false;
          view.scrollTop -= screenHeight;
          if (view.scrollTop == 0 && this.currentChapter >= 1) {
            this.currentChapter--;
            this.$nextTick(() => {
              view.scrollTop = 0;
            });
          }
        } else if (touchPointX > Wside && touchPointX < screenWidth - Wside && touchPointY > Hside && touchPointY < screenHeight - Hside) {
          this.ismenushow = !this.ismenushow;
        } else if (touchPointX < screenWidth && touchPointX > screenWidth - Wside && this.ismenushow == false) {
          this.ismenushow = false;
          if (view.scrollHeight == view.scrollTop + screenHeight) {
            this.currentChapter++;
            this.$nextTick(() => {
              view.scrollTop = 0;
            });
          }
          view.scrollTop += screenHeight;
        }
      } else {
        if (this.X > 0) {
          // console.log('this.X > 0 ' + this.X > 0);
          el.preventDefault();
          view.scrollTop -= screenHeight;
        } else {
          // console.log('this.X > 0 ' + this.X > 0);
          el.preventDefault();
          if (view.scrollHeight == view.scrollTop + screenHeight) {
            this.currentChapter++;

          }
          view.scrollTop += screenHeight;
        }
      }
    },
    goChapter (num) {
      this.currentChapter = num;
      this.ismenushow = false;
    },
    chapterUp () {
      if (this.currentChapter == 0) {
        Toast('当前章节为第一章');
        return;
      }
      this.currentChapter -= 1;
    },
    chapterDown () {
      if (this.currentChapter >= this.chapters.length - 1) {
        this.currentChapter = this.chapters.length - 1;
        Toast('后面已经没有了');
        return;
      }
      this.currentChapter += 1;
    }
  }
}
</script>
<style type="text/css">
.readerslide-enter-active {
  transition-duration: 0.5s;
}
.readerslide-enter {
  transform: translate3d(100vw, 0, 0);
}
.reader-container {
  position: relative;
}
.reader-container a {
  color: white;
}
</style>
