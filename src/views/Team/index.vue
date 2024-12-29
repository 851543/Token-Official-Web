<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDown } from '@/composables/useDown'
import axios from 'axios'
const downArrow = ref<HTMLElement | null>(null)
const { setDownArrow } = useDown()

onMounted(() => {
  setDownArrow(downArrow.value)
})

import { getTeamData } from '@/api/team'

// 团队数据处理函数
const insertTeamData = (data: any) => {
  Object.keys(data).forEach((section) => {
    const container = document.querySelector(`#${section}`)
    if (!container) return

    data[section].forEach((person: any) => {
      if (person.in && person.img) {
        const div = document.createElement('div')
        div.className = 'circle-icon-holder'
        div.innerHTML = `
          <img class="circle-icon" src="${person.img}" alt="${person.name}">
          <div class="circle-icon-caption">
            <h3 class="text-center barlow-thin">${person.name}</h3>
            <p class="text-center barlow-medium">${person.role}</p>
          </div>
        `
        container.appendChild(div)
      }
    })
  })
}

// 加载团队数据
const fetchTeamData = async () => {
  try {
    const data = await getTeamData()
    insertTeamData(data)
  } catch (error) {
    console.error('Error loading team data:', error)
  }
}

// 展开/收起按钮处理
const handleExpander = (sectionId: string) => {
  const section = document.querySelector(`#${sectionId}`)
  const expander = document.querySelector(`#${sectionId}-expander`)
  const button = expander?.querySelector('.button-text')

    if (section && button) {
      if (!section.classList.contains('icons-expanded')) {
        section.classList.add('icons-expanded')
        button.textContent = '收起'
      } else {
        section.classList.remove('icons-expanded')
        button.textContent = '查看全部'
      }

      section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

onMounted(() => {
  fetchTeamData(),
    // 添加展开/收起事件监听
    ['board', 'technical', 'management', 'design'].forEach((id) => {
    document.querySelector(`#${id}-expander`)?.addEventListener('click', () => handleExpander(id))
  })
})
</script>
<template>
  <div class="main" id="home-scroll">
    <div class="main-text-holder">
      <h1 data-aos="fade-up" class="barlow-extralight">团队介绍</h1>

      <h2 data-aos="fade-up" class="barlow-medium">2024-2025 年度核心团队</h2>
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

    <img src="@/assets/images/team.svg" class="main-image" alt="团队成员" />
  </div>

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">核心成员</h1>

    <div class="icons" id="board"></div>

    <div id="board-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">查看全部</div>
      </div>
    </div>
  </div>

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">技术团队</h1>

    <div class="icons" id="technical"></div>

    <div id="technical-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">查看全部</div>
      </div>
    </div>
  </div>

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">运营团队</h1>

    <div class="icons" id="management"></div>

    <div id="management-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">查看全部</div>
      </div>
    </div>
  </div>

  <div class="container-main holded-container" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px">设计团队</h1>

    <div class="icons" id="design"></div>

    <div id="design-expander">
      <div class="button-maker">
        <div class="barlow-thin button-text">查看全部</div>
      </div>
    </div>
  </div>
  <div class="container-main  container-main-last" />
</template>
<style scoped>
.main-image{
    width: 30vw;
    min-width: 200px;
}

.container-main{
    background: linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)), url('../images/after-landing.svg') center center fixed;
    background-size:cover;
}

.dark .container-main{
    background: linear-gradient(rgba(32,32,32,.9), rgba(32,32,32,.9)), url('../images/after-landing-dark.svg') center center fixed;
    background-size:cover;
}

.navbar-dsc-logo{
    display: inline-block;
}

.icons{
    max-height: 300px;
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

.circle-icon-holder{
    min-height: 300px;
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

</style>