<template>
  <div>

    <div class="terminal">
      <div class="header">
        <h4>智慧农业平台-在线技术帮扶</h4>
        <ul class="shell-dots">
          <li class="red"></li>
          <li class="yellow"></li>
          <li class="green"></li>
        </ul>
      </div>

      <div style="position:absolute;top:0;left:0;right:0;overflow:auto;z-index:1;margin-top:30px;"
           ref="terminalWindow">
        <div class="terminal-window" id="terminalWindow">
          <span>
            <p>智慧农业平台-在线技术支持</p>
          </span>
          <p>
            <span class="prompt"></span><span class="cmd">正在连接客服...ok!</span>
          </p>

          <p v-if="actionResult">
            <span class="cmd">
            客服：{{actionResult}}
            </span>
          </p>

          <div class="cmd" v-for="i in saidHistory" :key="i.time">
            <!--<p>-->
              <!--我({{i.time}}) - {{i.text}}-->
            <!--</p>-->
            <!--<div class="cmd" v-for="j in adminSaid" :key="j.time">-->
              <!--<p v-show="adminHasSaid">-->
                <!--客服({{j.time}}) - {{j.text}}-->
              <!--</p>-->
            <!--</div>-->
          </div>

          <p class="terminal-last-line" ref="terminalLastLine">
            <span :class="lastLineClass" v-html="lastLineContent"></span>
          </p>
        </div>
        <label>
          <Input type="textarea" clearable style="width: 300px" v-model="inputText" :autosize="true"
                 placeholder="输入问题 ..."></Input>
          <Button type="primary" @click="handleSend">发送</Button>
          <Button type="success" @click="handleAdminSend">客服</Button>
        </label>
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        actionResult: '你好，',
        lastLineContent: '...',
        userData: null,
        inputText: '',
        saidHistory: [
          {
            iSaid: {},
            adminSaid: {}
          }
        ],
      }
    },
    computed: {
      lastLineClass() {
        if (this.lastLineContent === '&nbsp') {
          return 'cursor'
        } else if (this.lastLineContent === '...') {
          return 'loading'
        }
      },
    },
    methods: {
      handleSend() { // TODO
        this.inputText = '';
      },
      autoScroll() {
        this.$nextTick(() => {
          this.$refs.terminalWindow.scrollTop = this.$refs.terminalLastLine.offsetTop;
        })
      },
      handleAdminSend() { // TODO
      }
    },
    mounted() {
      this.$Loading.start();
      this.userData = JSON.parse(localStorage.getItem('userData'));
      if (this.userData === null) {
        this.actionResult += '游客';
      } else {
        this.actionResult += '本站尊敬的会员，' + this.userData.userName;
      }
      this.$Loading.finish();
    },
  }
</script>

<style scoped lang="scss">
  .terminal {
    position: relative;
    width: 50%;
    border-radius: 4px;
    color: white;
    margin-bottom: 10px;
    max-height: 580px;
    margin-left: 25%;
  }

  .terminal .header ul.shell-dots li {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: rgb(3, 9, 36);
    margin-left: 6px
  }

  .terminal .header ul.shell-dots li.red {
    background-color: rgb(200, 48, 48);
  }

  .terminal .header ul.shell-dots li.yellow {
    background-color: rgb(247, 219, 96);
  }

  .terminal .header ul.shell-dots li.green {
    background-color: rgb(46, 201, 113);
  }

  .terminal .header {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    left: 0;
    background-color: rgb(149, 149, 152);
    text-align: center;
    padding: 2px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px
  }

  .terminal .header h4 {
    font-size: 14px;
    margin: 5px;
    letter-spacing: 1px;
  }

  .terminal .header ul.shell-dots {
    position: absolute;
    top: 5px;
    left: 8px;
    padding-left: 0;
    margin: 0;
  }

  .terminal .terminal-window {
    padding-top: 50px;
    background-color: rgb(3, 9, 36);
    min-height: 140px;
    padding: 20px;
    font-weight: normal;
    font-family: Monaco, Menlo, Consolas, monospace;
    color: #fff;

    pre {
      font-family: Monaco, Menlo, Consolas, monospace;
      white-space: pre-wrap;
    }

    p {
      overflow-wrap: break-word;
      word-break: break-all;
      font-size: 13px;

      .cmd {
        line-height: 24px;
      }

      .info {
        padding: 2px 3px;
        background: #2980b9;
      }

      .warning {
        padding: 2px 3px;
        background: #f39c12; // https://github.com/Mayccoll/Gogh/blob/master/content/themes.md #Flat
      }

      .success {
        padding: 2px 3px;
        background: #27ae60;
      }

      .error {
        padding: 2px 3px;
        background: #c0392b;
      }

      .system {
        padding: 2px 3px;
        background: #bdc3c7;
      }
    }

    pre {
      display: inline;

    }
  }

  .terminal .terminal-window .prompt::before {
    content: "$";
    margin-right: 10px;
  }

  .terminal .terminal-window .cursor {
    margin: 0;
    background-color: white;
    animation: blink 1s step-end infinite;
    -webkit-animation: blink 1s step-end infinite;
    margin-left: -5px;
  }

  .terminal .terminal-window .loading {
    display: inline-block;
    width: 0;
    overflow: hidden;
    animation: load 1.2s step-end infinite;
    -webkit-animation: load 1.2s step-end infinite;
  }

  .terminal-last-line {
    font-size: 0;
    word-spacing: 0;
    letter-spacing: 0;
  }

  .input-box {
    position: relative;
    background: rgb(3, 9, 36);
    border: none;
    width: 1px;
    opacity: 0;
    cursor: default;
  }

  .input-box:focus {
    outline: none;
    border: none;
  }
</style>
