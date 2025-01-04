<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDown } from '@/composables/useDown'
import { getTeamData } from '@/api/team'
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/lang'
import type { TeamMember, TeamData } from '@/types/team'

const i18n = useI18n()
const langStore = useLangStore()
const downArrow = ref<HTMLElement | null>(null)
const { setDownArrow } = useDown()

// 团队数据处理函数
const insertTeamData = async () => {
  try {
    const data = await getTeamData(langStore.currentLang)
    const sections: (keyof TeamData)[] = ['board', 'technical', 'management', 'design']
    
    sections.forEach((section) => {
      const container = document.querySelector(`#${section}`)
      if (!container) return

      // 清空现有内容
      container.innerHTML = ''

      data[section].forEach((person: TeamMember) => {
        if (person.in && person.img) {
          const div = document.createElement('div')
          div.className = 'circle-icon-holder'
          
          // 构建社交媒体链接HTML
          const socialLinksHtml: string[] = []
          if (person.links && Object.keys(person.links).length > 0) {
            Object.values(person.links).forEach((link) => {
              socialLinksHtml.push(`
                  <a href="${link.url}" target="_blank" class="social-link" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin: 0 8px;">
                    <img src="${link.icon}" alt="${link.alt}" class="social-icon" style="width: 24px; height: 24px;">
                  </a>
              `)
            })
          }

          div.innerHTML = `
            <div class="circle-icon-wrapper">
              <img class="circle-icon" src="${person.img}" alt="${person.name}">
            </div>
            <div class="circle-icon-caption">
              <h3 class="text-center barlow-thin">${person.name}</h3>
              <p class="text-center barlow-medium" style="margin-bottom: 10px;">${person.role}</p>
              <div class="social-links" style="display: flex; justify-content: center; align-items: center; gap: 15px; height: 32px;">
                ${socialLinksHtml.length > 0 ? socialLinksHtml.join('') : ''}
              </div>
            </div>
          `
          container.appendChild(div)
        }
      })
    })
  } catch (error) {
    console.error('Failed to insert team data:', error)
  }
}

// 监听语言变化
watch(() => langStore.currentLang, () => {
  insertTeamData()
})

// 展开/收起按钮处理
const handleExpander = (id: string) => {
  const section = document.querySelector(`#${id}`)
  const expander = document.querySelector(`#${id}-expander`)
  const button = expander?.querySelector('.button-text')
  
  if (section && button) {
    if (!section.classList.contains('icons-expanded')) {
      section.classList.add('icons-expanded')
      button.textContent = i18n.t('team.collapse')
    } else {
      section.classList.remove('icons-expanded')
      button.textContent = i18n.t('team.expand')
    }

    // 滚动到展开的部分
    if (section.classList.contains('icons-expanded')) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}

onMounted(() => {
  setDownArrow(downArrow.value)
  insertTeamData()
  // 添加展开/收起事件监听
  ;['board', 'technical', 'management', 'design'].forEach((id) => {
    document.querySelector(`#${id}-expander`)?.addEventListener('click', () => handleExpander(id))
  })
})
</script>

<template>
  <div class="main" id="home-scroll">
    <div class="main-text-holder">
      <h1 data-aos="fade-up" class="barlow-extralight">{{ $t('team.title') }}</h1>
      <p data-aos="fade-up" class="barlow-medium description">{{ $t('team.description') }}</p>
      <h2 data-aos="fade-up" class="barlow-medium">2024-2025 {{ $t('team.annualTeam') }}</h2>
    </div>

    <div class="main-down-arrow" id="down-arrow" ref="downArrow">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.55 44.393">
        <g id="Group_2" data-name="Group 2" transform="translate(-966 -967.48)">
          <path
            id="Path_1"
            data-name="Path 1"
            d="M982,967.98V1011.1"
            transform="translate(-1.5)"
            fill="none"
            stroke="#141414"
            stroke-linecap="round"
            stroke-width="1"
          />
          <path
            id="Path_2"
            data-name="Path 2"
            d="M966.813,997.8l13.973,13.577L994.363,997.8"
            transform="translate(-0.313)"
            fill="none"
            stroke="#141414"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          />
        </g>
      </svg>
    </div>

    <img src="@/assets/images/team.svg" class="main-image" :alt="$t('team.teamMembers')" />
  </div>

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">{{ $t('team.coreMembers') }}</h1>
    <div class="icons" id="board"></div>
    <div id="board-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">{{ $t('team.expand') }}</div>
      </div>
    </div>
  </div>

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">{{ $t('team.technicalTeam') }}</h1>
    <div class="icons" id="technical"></div>
    <div id="technical-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">{{ $t('team.expand') }}</div>
      </div>
    </div>
  </div>

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">{{ $t('team.operationTeam') }}</h1>
    <div class="icons" id="management"></div>
    <div id="management-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">{{ $t('team.expand') }}</div>
      </div>
    </div>
  </div>

  <div class="container-main holded-container" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">{{ $t('team.designTeam') }}</h1>
    <div class="icons" id="design"></div>
    <div id="design-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">{{ $t('team.expand') }}</div>
      </div>
    </div>
  </div>
  <div class="container-main container-main-last" />
</template>

<style scoped>
.main-image{
    width: 30vw;
    min-width: 200px;
}

.container-main {
  background:
    linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url('@/assets/images/after-landing.svg') center center fixed;
  background-size: cover;
}

.dark .container-main {
  background:
    linear-gradient(rgba(32, 32, 32, 0.9), rgba(32, 32, 32, 0.9)),
    url('@/assets/images/after-landing-dark.svg') center center fixed;
  background-size: cover;
}

.navbar-dsc-logo{
    display: inline-block;
}

.icons{
    max-height: 350px;
    overflow: hidden;
    margin-bottom: 20px;
    transition: all .6s ease;
}

.icons-expanded{
    transition: all .6s ease;
    max-height: unset;
}

.icons{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    align-items: center;
    justify-items: center;
}


.circle-icon-holder {
  min-height: 300px;
  height: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  transition: all 0.3s ease;
}

.circle-icon-holder:hover {
  transform: translateY(-5px);
}

.circle-icon-caption {
  margin-top: 15px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.circle-icon-caption h3 {
  font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
  margin: 0 0 8px 0;
  color: #333;
}

.circle-icon-caption p {
  font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #666;
  letter-spacing: 0.5px;
  margin: 0 0 15px 0;
}

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  padding: 6px;
}

.social-link:hover {
  transform: translateY(-2px);
  background-color: rgba(0, 0, 0, 0.08);
}

.social-icon {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  transition: opacity 0.3s ease;
}

.social-link:hover .social-icon {
  opacity: 1;
}

/* 暗色模式适配 */
.dark .social-link {
  background-color: rgba(255, 255, 255, 0.08);
}

.dark .social-link:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

/* Portrait tablets and small desktops */
@media (min-width: 992px) and (max-width: 1180px) {

    .main-image{
        top: 30vh;
    }

    .icons{
        max-height: 300px;
    }

    .icons-expanded{
        transition: all .6s ease;
        max-height: unset;
    }

}

/* Portrait tablets and small desktops */
@media (min-width: 768px) and (max-width: 991px) {

    .main-image{
        top: 30vh;
    }

    .icons{
        max-height: 300px;
    }

    .icons-expanded{
        transition: all .6s ease;
        max-height: unset;
    }

}

/* Landscape phones and portrait tablets */
@media (max-width: 767px) {

    .main-image{
        top: 30vh;
        transform:translateY(0%);
        float: left;
        padding-left:10vw;
        height: 250px;
    }

    .icons{
        max-height: 600px;
    }

    .icons-expanded{
        transition: all .6s ease;
        max-height: unset;
    }

}

/* Portrait phones and smaller */
@media (max-width: 480px) {

    .main-image{
        top: 30vh;
        transform:translateY(0%);
        float: left;
        padding-left:10vw;
        height: 250px;
    }

    .icons{
        max-height: 620px;
    }

    .icons-expanded{
        transition: all .6s ease;
        max-height: unset;
    }

}

.main-text-holder h1 {
  font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  font-weight: 300;
  font-size: 3.5rem;
  letter-spacing: 2px;
  background: linear-gradient(120deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 8s ease infinite;
  background-size: 200% 200%;
}

.main-text-holder h2 {
  font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  font-weight: 400;
  font-size: 2rem;
  letter-spacing: 1px;
  background: linear-gradient(120deg, #4ecdc4, #45b7af);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 8s ease infinite;
  background-size: 200% 200%;
  animation-delay: 0.5s;
}

.container-main h1 {
  font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 2.5rem;
  letter-spacing: 1.5px;
  background: linear-gradient(120deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 30px;
  text-align: center;
}

.container-main h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%,
    #ff6b6b 30%,
    #4ecdc4 70%,
    transparent 100%
  );
  border-radius: 4px;
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.container-main h1::before {
  display: none;
}

.container-main h1:hover {
  transform: translateY(-2px);
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes textShine {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.social-link {
  color: #666;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  color: #4ecdc4;
  transform: translateY(-2px);
}

.csdn-icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.social-link:hover .csdn-icon {
  opacity: 1;
  transform: scale(1.1);
}

/* 响应式字体大小调整 */
@media (max-width: 768px) {
  .main-text-holder h1 {
    font-size: 2.8rem;
  }
  
  .main-text-holder h2 {
    font-size: 1.8rem;
  }
  
  .container-main h1 {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .main-text-holder h1 {
    font-size: 2.4rem;
  }
  
  .main-text-holder h2 {
    font-size: 1.6rem;
  }
  
  .container-main h1 {
    font-size: 2rem;
  }
}

</style>