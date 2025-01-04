<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDown } from '@/composables/useDown'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const downArrow = ref<HTMLElement | null>(null)
const { setDownArrow } = useDown()

onMounted(() => {
  setDownArrow(downArrow.value)
})  
</script>
<template>
  <div class="main" id="home-scroll">
    <div class="main-text-holder">
      <h1 data-aos="fade-up" class="barlow-extralight">{{ t('moreLinks.title') }}</h1>

      <h2 data-aos="fade-up" class="barlow-medium">{{ t('moreLinks.subtitle') }}</h2>
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

    <img src="@/assets/images/landing.svg" class="main-image" :alt="t('nav.moreLinks')" />
  </div>

  <div class="container-main holded-container container-main-last" id="our-work-scroll">
    <h1 class="barlow-medium text-center" style="padding-bottom: 90px" data-aos="fade-up">
      {{ t('moreLinks.aiEra') }}
    </h1>

    <div class="course-main">
      <a style="text-decoration: none" href="javascript:void(0)">
        <div class="course-div col-lg-6 col-md-6" data-aos="fade-up">
          <img
            class="course-img vlight"
            src="@/assets/images/courses/angadCourse.png"
            :alt="t('moreLinks.courses.golang.title')"
          />
          <img
            class="course-img vdark"
            src="@/assets/images/courses/angadCoursed.jpeg"
            :alt="t('moreLinks.courses.golang.title')"
          />
          <div>
            <h3 class="text-center barlow-thin">{{ t('moreLinks.courses.golang.title') }}</h3>
            <a style="text-decoration: none" href="javascript:void(0)"
              ><p class="text-center barlow-medium">{{ t('moreLinks.courses.golang.viewOnGithub') }}</p></a
            >
          </div>
        </div>
      </a>

      <a style="text-decoration: none" href="javascript:void(0)">
        <div class="course-div col-lg-6 col-md-6" data-aos="fade-up">
          <img
            class="course-img vlight"
            src="@/assets/images/courses/ubaidCourse.png"
            :alt="t('moreLinks.courses.machineLearning.title')"
          />
          <img
            class="course-img vdark"
            src="@/assets/images/courses/ubaidCoursed.jpeg"
            :alt="t('moreLinks.courses.machineLearning.title')"
          />

          <div>
            <h3 class="text-center barlow-thin">{{ t('moreLinks.courses.machineLearning.title') }}</h3>
            <a style="text-decoration: none" href="javascript:void(0)"
              ><p class="text-center barlow-medium">{{ t('moreLinks.courses.machineLearning.viewOnGithub') }}</p></a
            >
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="container-main  container-main-last" />
</template>

<style scoped>
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
