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

      <div style="top:0;left:0;right:0;overflow:auto;z-index:1"
           ref="terminalWindow">
        <div class="terminal-window" id="terminalWindow">
          <span>
            <p>智慧农业平台-在线技术支持</p>
          </span>
          <p>
            <span class="prompt"></span><span class="cmd">正在连接服务器...ok!</span>
          </p>

          <div class="cmd" v-for="i in saidHistory" :key="i.time">
            <p v-if="i.adminSaid !== null">
              客服({{i.adminSaid.time}}) # {{i.adminSaid.text}}
            </p>
            <p v-if="i.iSaid !== null">
              我({{i.iSaid.time}}) # {{i.iSaid.text}}
            </p>
          </div>

          <p class="terminal-last-line" ref="terminalLastLine">
            <span :class="lastLineClass" v-html="lastLineContent"></span>
          </p>
        </div>
        <label>
          <Input type="textarea" clearable style="width: 300px" v-model="inputText" :autosize="true"
                 placeholder="输入问题 ..."></Input>
          <Button type="primary" @click="handleSend">发送</Button>
          <Button type="warning" @click="handleInputCancel">清空输入</Button>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Support",
    data() {
      return {
        actionResult: '你好，',
        lastLineContent: '...',
        userData: null,
        inputText: '',
        saidHistory: [
          {
            adminSaid: {
              time: new Date().toLocaleTimeString(),
              text: ''
            },
            iSaid: {
              time: new Date().toLocaleTimeString(),
              text: '......'
            }
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
        this.$Loading.start();

        this.$http.post('msg/send', {
          msgTo: '00000',
          msgMsg: this.inputText
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success('发送' + res.body.msg);
            let j = {
              iSaid: {
                text: this.inputText,
                time: new Date().toLocaleTimeString()
              },
              adminSaid: null
            };
            this.saidHistory.push(j);
            this.inputText = '';
          } else {
            this.$Message.error(res.body.msg);
            this.$Loading.error();
          }
        }, err => {
          console.log(err);
          this.$Loading.error();
          this.$Message.error('msg.send err');
        });

        this.$Loading.finish();
      },
      autoScroll() {
        this.$nextTick(() => {
          this.$refs.terminalWindow.scrollTop = this.$refs.terminalLastLine.offsetTop;
        })
      },
      handleInputCancel() {
        this.inputText = '';
      }
    },
    mounted() {
      this.$Loading.start();
      this.$http.post('msg/accept', {}).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
      this.$Loading.finish();
    }
  }
</script>

<style scoped lang="scss">
  .terminal {
    position: relative;
    width: 80%;
    border-radius: 4px;
    color: white;
    margin-bottom: 10px;
    max-height: 580px;
    margin-left: 10%;
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
