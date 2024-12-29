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
      <h1 data-aos="fade-up" class="barlow-extralight">我们的动态</h1>

      <h2 data-aos="fade-up" class="barlow-medium">Java Python 前后端 嵌入式的技术栈 研发项目</h2>
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

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px" data-aos="fade-up">
      AI时代
    </h1>

    <div class="course-main">
      <a style="text-decoration: none" href="javascript:void(0)">
        <div class="course-div col-lg-6 col-md-6" data-aos="fade-up">
          <img
            class="course-img vlight"
            src="@/assets/images/courses/angadCourse.png"
            alt="Go语言"
          />
          <img
            class="course-img vdark"
            src="@/assets/images/courses/angadCoursed.jpeg"
            alt="Go语言"
          />
          <div>
            <h3 class="text-center barlow-thin">Go语言</h3>
            <a style="text-decoration: none" href="javascript:void(0)"
              ><p class="text-center barlow-medium">Github 上查看</p></a
            >
          </div>
        </div>
      </a>

      <a style="text-decoration: none" href="javascript:void(0)">
        <div class="course-div col-lg-6 col-md-6" data-aos="fade-up">
          <img
            class="course-img vlight"
            src="@/assets/images/courses/ubaidCourse.png"
            alt="机器学习：让计算机思考！"
          />
          <img
            class="course-img vdark"
            src="@/assets/images/courses/ubaidCoursed.jpeg"
            alt="机器学习：让计算机思考！"
          />

          <div>
            <h3 class="text-center barlow-thin">机器学习</h3>
            <a style="text-decoration: none" href="javascript:void(0)"
              ><p class="text-center barlow-medium">Github 上查看</p></a
            >
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="container-main  container-main-last" />
</template>

<style scoped>
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
.course-main {
  margin: auto auto;
  text-align: center;
}
.course-div {
  display: inline-block;
  margin: auto auto;
  text-align: center;
}
.course-img {
  width: 40vw;
  min-width: 300px;
  max-width: 400px;
}
.vdark {
  display: none;
}
.dark .vdark {
  display: block;
}
.dark .vlight {
  display: none;
}
/* Portrait tablets and small desktops */
@media (max-width: 800px) {
  .course-div {
    width: 80vw;
    margin-left: 10vw;
    margin-right: 10vw;
    /* margin: auto auto; */
    text-align: center;
    margin-bottom: 20px;
  }
  .course-img {
    /*display: inline-block;*/
    width: 80vw;
    min-width: 300px;
    /* max-width: 400px; */
  }
  .dark .vdark {
    display: inline-block;
  }
  .vdark {
    display: none;
  }
  .course-main {
    margin-left: auto;
    margin-right: auto;
  }
  .main-image {
    margin-top: 70px;
  }
}
</style>
