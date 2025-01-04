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
        <img data-aos="fade-up" src="@/assets/images/test.png" class="logo" alt="GDSC VIT" />
      </div>
      <p data-aos="fade-up" class="barlow-extralight continous-text">
        {{ $t('team.description') }}
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
    <img src="@/assets/images/landing.svg" class="main-image" :alt="$t('nav.home')" />
  </div>
  <div class="container-main holded-container" id="our-work-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">{{ $t('home.features.title') }}</h1>
    <p data-aos="fade-up" class="barlow-extralight continous-text text-center extra-break">
      {{ $t('home.description') }}
    </p>
  </div>

  <div class="container-main holded-container" id="team-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">{{ $t('team.title') }}</h1>

    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      {{ $t('team.description') }}
    </p>

    <router-link to="/team">
      <div data-aos="fade-up" class="button-maker">
        <div class="barlow-thin button-text">{{ $t('nav.team') }}</div>
      </div>
    </router-link>
  </div>

  <div class="container-main holded-container" id="updates-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">{{ $t('nav.moreLinks') }}</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      {{ $t('home.description') }}
    </p>
    <div data-aos="fade-up" class="buttons">
      <router-link to="/morelinks">
        <div class="button-maker" id="projects-button">
          <div class="barlow-thin button-text">{{ $t('home.features.create') }}</div>
        </div>
      </router-link>
    </div>
  </div>

  <div class="container-main holded-container" id="updates-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">{{ $t('nav.blogs') }}</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      {{ $t('blogs.description') }}
    </p>

    <div data-aos="fade-up" class="buttons">
        <router-link to="/blogs">
        <div class="button-maker" id="projects-button">
          <div class="barlow-thin button-text">{{ $t('blogs.readMore') }}</div>
        </div>
      </router-link>
    </div>
  </div>
  <div class="container-main holded-container" id="contact-scroll">
    <h1 data-aos="fade-up" class="barlow-medium text-center">{{ $t('contact.title') }}</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      {{ $t('contact.description') }}
    </p>
    <div data-aos="fade-up" class="icons small-icons">
      <a href="https://github.com/851543" target="_blank" rel="noopener"> 
        <img src="@/assets/images/Github.svg" class="circle-icon spc" alt="Github" />
      </a>
    </div>
  </div>
  <div class="container-main holded-container">
    <h1 data-aos="fade-up" class="barlow-medium text-center">{{ $t('create.hero.title') }}</h1>
    <p data-aos="fade-up" class="barlow-extralight text-center extra-break">
      {{ $t('create.hero.description') }}
    </p>
    <a href="https://qm.qq.com/cgi-bin/qm/qr?k=6IYFpyE-HdWRVPAJBEjU_mpGBGwbfIGE&jump_from=webapi&authKey=Yw5QXvXNBBB8DQMO5LgXHHNxRBMGjLR3b9FUhw2XlE5xtloyXGhL5VdSlXG5H5Zz" target="_blank" rel="noopener">
      <div data-aos="fade-up" class="button-maker">
        <div class="barlow-thin button-text">{{ $t('create.hero.startButton') }}</div>
      </div>
    </a>
  </div>
  <div class="container-main  container-main-last" />
</template>
