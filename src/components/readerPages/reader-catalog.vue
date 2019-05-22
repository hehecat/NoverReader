 <template>
  <transition name="catalogslide">
    <div v-show="menu"
         class="reader-catalog">
      <div class="reader-menu-top">
        <mu-icon value="arrow_back_ios"
                 @click='hidelist'
                 style="vertical-align: middle;padding-left: 20px"></mu-icon>
        <p v-show="this.$store.state.isShowCatlog"
           class="catlog-reverse"
           @click="toChapter">章节跳跃</p>
      </div>
      <ul id="test"
          v-show="this.$store.state.isShowCatlog"
          class="book-catalog">
        <a @click="changeChapter(index)"
           href="javascript:"
           v-for='(list,index) in catlog'
           :key="index">
          <li class="catalog-lists">{{list.section_name}}</li>
        </a>
      </ul>
    </div>
  </transition>
</template>
<script type="text/javascript">
import { MessageBox } from 'mint-ui'
export default {
  props: ['catlog', 'sources', 'Total'],
  methods: {
    hidelist () {
      this.$store.commit('ChangeDetail')
    },
    changeChapter (index) {
      this.$emit('ChangeChapter', index);
      this.$store.commit('ChangeDetail');
      document.getElementById('reader-page-view').scrollTop = 0;

    },
    toChapter () {
      MessageBox.prompt('请输入想去的章节').then(data => {
        if (data.value <= this.Total && data.value > 0) {
          this.$emit('ChangeChapter', parseInt(data.value - 1))
        }
      }).catch(() => { })
    }
  },
  computed: {
    menu () {
      return this.$store.state.isShowCatlog || this.$store.state.isShowSource
    }
  }
}
</script>
<style type="text/css">
.catalogslide-enter-active {
  transition-duration: 0.4s;
}
.catalogslide-enter {
  transform: translate3d(100vw, 0, 0);
}
.reader-catalog {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}
.book-catalog {
  margin-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.catalog-lists {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 14px;
  color: #555;
  border-bottom: 1px solid #ddd;
}
.catlog-reverse {
  position: absolute;
  right: 10px;
  top: 0;
}
</style>
