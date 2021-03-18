window.onload = function () {
  var app = new Vue({
    el: '#app',
    data: {
      text: 'hello',
      name: "",
      scenes: {
        opening: false,  // オープニング
        prologue: false,  // 導入
        entrance: false,
        workspace: false,
      },
      comment: {  // 表示中のコメントとステータス
        showed: false,
        text: "",
      },
      // trueになったら終わり
      question1: null,
      question2: null,
      question3: null,
    },
    computed: {
      month () {
        // 1~12の乱数
        const min = 1;
        const max = 12;
        return Math.floor( Math.random() * (max + 1 - min) ) + min ;
      },
      day () {
        // 1~31の乱数
        const min = 1;
        const max = 31;
        return Math.floor( Math.random() * (max + 1 - min) ) + min ;
      }
    },
    mounted () {
      this.$nextTick(function () {
        app.scenes.prologue = true;
      })
    },
    methods: {
      goNextScene (event) {
        // let index = 0;
        // const scenes = Object.keys(this.scenes);
        // scenes.forEach((sceneName, i) => {
        //   if (this.scenes[sceneName]) {
        //     index = i;
        //     this.scenes[sceneName] = false;
        //   } else if (i === index + 1) {
        //     this.scenes[sceneName] = true;
        //   }
        // });
        const $currentSection =  $(event.currentTarget).parents('section');
        const $nextSection = $currentSection.next('section');
        $currentSection.removeClass("is-show");
        $nextSection.addClass('is-show');
      },
      goNextPhrase (event) {
        // const $this = event.currentTarget;
        // const $next = $this.nextElementSibling;
        // $this.classList.add('is-disabled');
        // $next.classList.add('is-show');
        const $this = $(event.currentTarget);
        const $next = $this.next('.c-comment');
        $this.removeClass('is-show');
        $next.addClass('is-show');
      },
      showComment (text) {
        for (let i = 0; i < text.length; i++) {
          setTimeout(() => {
            this.comment.text += text.slice(i, i + 1);
          }, 5000);
        }
      },
      showCharacter (event) {
        $(event.currentTarget).parents('section').find('.js-character').addClass('is-show');
        this.goNextPhrase(event);
      },
      goQuestion (id) {
        $('.c-question').filter(`[data-question-id="${id}"]`).addClass('is-show');
      },
      reloadPage(){
        window.location.reload()
      },
      answer1 (value, event) {
        this.question1 = value;
        const $question = $(event.currentTarget).parents('.c-question');
        $question.removeClass('is-show');
        $question.next(".c-comment").addClass('is-show');
      },
      answer2 (value, event) {
        this.question2 = value;
        const $question = $(event.currentTarget).parents('.c-question');
        $question.removeClass('is-show');
        $question.prev('.c-comment').removeClass('is-show');
        $question.next(".c-comment").addClass('is-show');
      },
      answer3 (value, event) {
        this.question3 = value;
        const $question = $(event.currentTarget).parents('.c-question');
        $question.removeClass('is-show');
        $question.prev('.c-comment').removeClass('is-show');
        $question.next(".c-comment").addClass('is-show');
      },
    }
  });
}
