<template>
  <div class="relative right-0 h-full flex">
    <div
      class="w-full h-content-headless-toolbox bg-silver border-l-3 border-t-3 border-white py-1.5 px-1"
    >
      <!-- Score and time -->
      <div
        class="flex items-center border-2 border-b-white border-r-white border-l-gray-128 border-t-gray-128 mb-2 justify-between h-16 md:h-10 px-1 p-1"
      >
        <div class="flex h-full border-b border-r border-white">
          <img :src="digitSrc(minesDigits.hundreds)" alt="0" class="h-full" />
          <img :src="digitSrc(minesDigits.tens)" alt="1" class="h-full" />
          <img :src="digitSrc(minesDigits.units)" alt="0" class="h-full" />
        </div>
        <div
          class="border-l border-t border-gray-128 active:rounded-sm active:border-l-2 active:border-t-2 active:border-b active:border-r"
        >
          <button
            @click="resetGame"
            class="w-10 h-10 md:w-7 md:h-7 flex items-center justify-center rounded-sm bg-gray-192 border-2 border-t-gray-245 border-l-gray-245 border-b-gray-128 border-r-gray-128 outline-none active:border-transparent"
          >
            <img
              :src="emojiSrc(emoji)"
              :alt="emoji + ' emoji'"
              class="w-8 h-8 md:w-5 md:h-5 active:translate-x-px active:translate-y-px"
            />
          </button>
        </div>
        <div class="flex h-full">
          <img
            :src="digitSrc(timerDigits.hundreds)"
            alt="score"
            class="h-full"
          />
          <img :src="digitSrc(timerDigits.tens)" alt="score" class="h-full" />
          <img :src="digitSrc(timerDigits.units)" alt="score" class="h-full" />
        </div>
      </div>
      <!-- Minesweeper content -->
      <div
        class="grid border-4 border-solid border-l-gray-128 border-t-gray-128 border-b-gray-245 border-r-gray-245"
        :style="{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }"
      >
        <div
          @mousedown="handleMouseDown($event, index)"
          @mouseup="handleMouseUp($event, index)"
          @contextmenu="handleRightClick($event, index)"
          v-for="(cell, index) in cells"
          :key="index"
          :data-index="index"
          class="relative w-full aspect-square"
        >
          <div
            v-if="!cell.uncovered && pressedCellIndex !== index"
            class="absolute w-full h-full border-3 border-t-gray-245 border-l-gray-245 border-b-gray-128 border-r-gray-128 bg-silver"
          ></div>
          <div
            v-else
            class="absolute w-full h-full border-t-2 border-l-2 border-gray-128"
          ></div>
          <img
            v-if="cell.uncovered && !cell.mine"
            :src="`${$baseUrl}img/icons/minesweeper/open${cell.neighborMines}.webp`"
            alt="empty"
            class="w-full h-full p-0.5"
          />
          <img
            v-if="cell.uncovered && cell.mine && cell.isClickedMine"
            :src="`${$baseUrl}img/icons/minesweeper/mine-death.webp`"
            alt="mine"
            class="w-full h-full p-0.5 bg-red"
          />
          <img
            v-if="cell.uncovered && cell.mine && !cell.isClickedMine"
            :src="`${$baseUrl}img/icons/minesweeper/mine-ceil.webp`"
            alt="mine"
            class="w-full h-full p-0.5"
          />
          <img
            v-if="!cell.uncovered && cell.flagged"
            :src="`${$baseUrl}img/icons/minesweeper/flag.webp`"
            alt="flag"
            class="relative z-10 w-full h-full p-0.5"
          />
          <img
            v-if="!cell.uncovered && cell.questioned"
            :src="`${$baseUrl}img/icons/minesweeper/question.webp`"
            alt="question"
            class="relative z-10 w-full h-full p-0.5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

