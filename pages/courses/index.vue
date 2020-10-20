<template>
  <section class="courses-list">
    <div class="sort-toolbar pa-4">
      <span>Сортировать:</span>
      <SortButton
        :text="'по дате'"
        :sortField="'startDate'"
        :curSortField="coursesSortFiled"
        :curSortDirection="coursesSortDirection"
        @sortClick="sortChange"
      />
      <SortButton
        :text="'по цене'"
        :sortField="'price'"
        :curSortField="coursesSortFiled"
        :curSortDirection="coursesSortDirection"
        @sortClick="sortChange"
      />
    </div>
    <List :items="getCoursesPageItems" />
    <div>
      <Paginator
        :pages="getCoursesPagesCount"
        :curPage="coursesCurPage"
        @change="pageChange"
      />
    </div>
    <div>
      <Button
        :text="'Добавить курс'"
        :type="'success'"
        @click="newCourse"
        class="mt-2"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import List from "@/components/List/List.vue";
import Button from "@/components/Buttons/Button";
import SortButton from "@/components/Buttons/SortButton";
import Paginator from "@/components/Paginator/Paginator";

export default {
  computed: {
    ...mapState([
      "coursesCurPage",
      "coursesSortFiled",
      "coursesSortDirection"
    ]),
    ...mapGetters(["getCoursesPageItems", "getCoursesPagesCount"])
  },
  components: {
    List,
    Button,
    Paginator,
    SortButton
  },
  methods: {
    ...mapActions(["addCourse"]),
    ...mapMutations(["SET_COURSES_CUR_PAGE", "SORT_COURSES"]),
    newCourse() {
      this.$router.push({ path: `/courses/course/0` });
    },
    pageChange(page) {
      this.SET_COURSES_CUR_PAGE(page);
    },
    sortChange(value) {
      this.SORT_COURSES(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.courses-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.sort-toolbar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
