<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDown } from '@/composables/useDown'

const downArrow = ref<HTMLElement | null>(null)
const { setDownArrow } = useDown()

onMounted(() => {
  setDownArrow(downArrow.value)
})  

</script>
<template>
  <div class="main" id="home-scroll">
    <div class="main-text-holder">
      <div class="main-text-holder-heading">
        <img data-aos="fade-up" src="@/assets/images/logo-12.png" class="logo" alt="GDSC VIT" />
      </div>
      <p data-aos="fade-up" class="barlow-extralight continous-text">
        在
        TOKEN，我们的目标是学习和教学。开发者、设计师和管理者齐聚一堂，共同创建一个激励大家进步的团队与。加入我们！
      </p>
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
    <img src="@/assets/images/landing.svg" class="main-image" alt="首页" />
  </div>
  <div class="container-main holded-container" id="our-work-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">我们的目标</h1>
    <p data-aos="fade-up" class="barlow-extralight continous-text text-center extra-break">
      我们的思维略显创新，我们的团队致力于促进学习和教学的共生发展。
    </p>
  </div>

  <div class="container-main holded-container" id="team-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">认识我们的团队</h1>

    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      我们拥有一支强大的团队，由热爱咖啡的开发者、热爱渐变的设计师和工作效率超高的管理者组成。
    </p>

    <a href="javascript:void(0)">
      <div data-aos="fade-up" class="button-maker">
        <div class="barlow-thin button-text">团队介绍</div>
      </div>
    </a>
  </div>

  <div class="container-main holded-container" id="updates-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">最新动态</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      我们正在积极开展活动，同时通过开发高质量项目为开源做出贡献。
    </p>
    <div data-aos="fade-up" class="buttons">
      <a href="javascript:void(0)" target="_blank" rel="noopener">
        <div class="button-maker" id="projects-button">
          <div class="barlow-thin button-text">项目展示</div>
        </div>
      </a>
    </div>
  </div>

  <div class="container-main holded-container" id="updates-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">我们的博客</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      我们的首要任务是学习和传播知识。我们的团队定期在 个人博客 上发布博客文章。
    </p>

    <div data-aos="fade-up" class="buttons">
      <a href="javascript:void(0)">
        <div class="button-maker" id="projects-button">
          <div class="barlow-thin button-text">查看博客</div>
        </div>
      </a>
    </div>
  </div>
  <div class="container-main holded-container" id="contact-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">联系我们</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      我们在社交媒体上非常活跃。
    </p>
    <div data-aos="fade-up" class="icons small-icons">
      <a href="javascript:void(0)" target="_blank" rel="noopener">
        <img src="@/assets/images/Github.svg" class="circle-icon spc" alt="GDSC VIT GitHub" />
      </a>
    </div>
  </div>
  <div class="container-main holded-container">
    <h1 data-aos="fade-up" class="barlow-medium text-center">提交创意</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      实现你的创意想法？何不让我们帮你将它变为现实。
    </p>
    <a href="javascript:void(0)" target="_blank" rel="noopener">
      <div data-aos="fade-up" class="button-maker">
        <div class="barlow-thin button-text">提交创意</div>
      </div>
    </a>
  </div>
  <div class="footer container-main container-main-last"></div>
</template>
