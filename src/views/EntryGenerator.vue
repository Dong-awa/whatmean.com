<template>
  <div class="entry-generator-page">
    <div class="container-fluid px-4 px-md-5 py-5">
      <div class="row">
        <div class="col-12 text-center mb-5">
          <h1 class="display-4 fw-bold text-primary">词条生成器</h1>
          <p class="lead text-white-50 mt-3">填写以下信息，生成符合格式的词条JSON文件</p>
        </div>
      </div>

      <div class="row mb-4 justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 liquid-glass-card">
            <div class="liquid-glass-card-hover">
              <div class="card-body p-5">
                <form @submit.prevent="generateEntry">
                  <div class="mb-4">
                    <label for="entryName" class="form-label fw-bold text-dark">词条名 *</label>
                    <input
                      type="text"
                      class="form-control liquid-glass-input"
                      id="entryName"
                      v-model="entryData.词条名"
                      placeholder="例如：遥遥领先、躺平、内卷"
                      required
                    >
                  </div>

                  <div class="mb-4">
                    <label for="entryIntro" class="form-label fw-bold text-dark">词条介绍 *</label>
                    <textarea
                      class="form-control liquid-glass-input"
                      id="entryIntro"
                      rows="2"
                      v-model="entryData.词条介绍"
                      placeholder="简短描述词条的含义或背景"
                      required
                    ></textarea>
                  </div>

                  <div class="mb-4">
                    <label for="entryDetail" class="form-label fw-bold text-dark">详细介绍 *</label>
                    <textarea
                      class="form-control liquid-glass-input"
                      id="entryDetail"
                      rows="6"
                      v-model="entryData.详细介绍"
                      placeholder="详细解释词条的来源、用法、文化背景等信息"
                      required
                    ></textarea>
                  </div>

                  <div class="mb-4">
                    <label for="entryYear" class="form-label fw-bold text-dark">词条年份 *</label>
                    <input
                      type="number"
                      class="form-control liquid-glass-input"
                      id="entryYear"
                      v-model.number="entryData.词条年份"
                      placeholder="例如：2025"
                      min="2000"
                      max="2030"
                      required
                    >
                  </div>

                  <div class="mb-4">
                    <label for="entryTags" class="form-label fw-bold text-dark">标签 *</label>
                    <input
                      type="text"
                      class="form-control liquid-glass-input"
                      id="entryTags"
                      v-model="entryData.标签"
                      placeholder="用逗号分隔，例如：网络用语,流行文化,反讽"
                      required
                    >
                  </div>

                  <div class="mb-4">
                    <label class="form-label fw-bold text-dark">提交时间</label>
                    <input
                      type="text"
                      class="form-control liquid-glass-input"
                      :value="currentDateTime"
                      readonly
                    >
                    <small class="form-text text-white-50">提交时间将自动设置为当前时间</small>
                  </div>

                  <div class="d-flex justify-content-between mt-4">
                    <button type="button" class="btn liquid-glass-btn-secondary" @click="resetForm">
                      重置表单
                    </button>
                    <button type="submit" class="btn liquid-glass-btn-primary">
                      生成词条JSON
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="generatedJson" class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 liquid-glass-card">
            <div class="liquid-glass-card-hover">
              <div class="card-body p-5">
                <h3 class="text-primary mb-3">生成的JSON预览</h3>
                <pre class="json-preview p-3 rounded"><code>{{ generatedJson }}</code></pre>
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <button class="btn liquid-glass-btn-success" @click="copyToClipboard">
                    复制到剪贴板
                  </button>
                  <a href="https://github.com/Nico6719/whatmean.com" target="_blank" class="btn liquid-glass-btn-outline">
                    前去提交
                  </a>
                  <small class="text-white-50" v-if="copied">已复制！</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntryGenerator',
  data() {
    return {
      entryData: {
        词条名: '',
        词条介绍: '',
        详细介绍: '',
        词条年份: new Date().getFullYear(),
        标签: ''
      },
      generatedJson: '',
      copied: false
    }
  },
  computed: {
    currentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    generateEntry() {
      const completeEntry = {
        ...this.entryData,
        "提交时间": this.currentDateTime
      };

      this.generatedJson = JSON.stringify(completeEntry, null, 2);
      this.copied = false;
    },
    resetForm() {
      this.entryData = {
        词条名: '',
        词条介绍: '',
        详细介绍: '',
        词条年份: new Date().getFullYear(),
        标签: ''
      };
      this.generatedJson = '';
      this.copied = false;
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.generatedJson);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
      }
    }
  }
}
</script>

<style scoped>
.entry-generator-page {
  background-color: transparent;
  min-height: 100vh;
}

.liquid-glass-card {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.1),
    inset 0 2px 8px rgba(255, 255, 255, 0.3),
    inset 0 -2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.liquid-glass-card::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.01));
  z-index: -1;
  border-radius: 30px;
  transition: all 0.4s ease;
}

.liquid-glass-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow:
    0 20px 50px rgba(31, 38, 135, 0.25),
    inset 0 2px 15px rgba(255, 255, 255, 0.5),
    inset 0 -2px 15px rgba(0, 0, 0, 0.1);
}

.liquid-glass-card:hover::before {
  top: -18px;
  left: -18px;
  right: -18px;
  bottom: -18px;
}

.liquid-glass-input {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow:
    0 2px 8px rgba(31, 38, 135, 0.1),
    inset 0 1px 4px rgba(255, 255, 255, 0.4),
    inset 0 -1px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  color: #212529;
}

.liquid-glass-input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.liquid-glass-input:focus {
  background: rgba(255, 255, 255, 0.9);
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  outline: none;
}

.liquid-glass-btn-primary {
  background: linear-gradient(45deg, #0d6efd, #0b5ed7);
  color: white;
  border: none;
  border-radius: 18px;
  padding: 10px 30px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
}

.liquid-glass-btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.4);
  background: linear-gradient(45deg, #0b5ed7, #0a58ca);
  color: white;
}

.liquid-glass-btn-secondary {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  padding: 10px 30px;
  font-weight: 600;
  color: #495057;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
}

.liquid-glass-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  color: #212529;
}

.liquid-glass-btn-success {
  background: linear-gradient(45deg, #198754, #157347);
  color: white;
  border: none;
  border-radius: 18px;
  padding: 10px 30px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(25, 135, 84, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
}

.liquid-glass-btn-success:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(25, 135, 84, 0.4);
  background: linear-gradient(45deg, #157347, #146c43);
  color: white;
}

.liquid-glass-btn-outline {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(13, 110, 253, 0.4);
  border-radius: 18px;
  padding: 10px 30px;
  font-weight: 600;
  color: #0d6efd;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
  text-decoration: none;
}

.liquid-glass-btn-outline:hover {
  background: rgba(13, 110, 253, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.2);
  color: #0d6efd;
}

.json-preview {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #e0e0e0;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow-x: auto;
}

.form-label {
  color: #212529;
  font-weight: 600;
}

.display-4 {
  animation: fadeInDown 0.8s ease;
}

.card {
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .card-body {
    padding: 24px !important;
  }

  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 10px;
  }

  .d-flex.justify-content-between .btn {
    width: 100%;
  }
}
</style>
