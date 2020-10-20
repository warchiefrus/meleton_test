import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = () => ({
  courses: [],
  coursesCurPage: 0,
  coursesMaxItemsOnPage: 2,
  coursesSortFiled: "",
  coursesSortDirection: 0
});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("getCourses");
  },
  async getCourses({ commit }) {
    await this.$axios
      .get("/api/data.JSON")
      .then(res => {
        if (res.data.courses) {
          commit("SET_COURSES", res.data.courses);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  async updateCourse({ commit }, payload) {
    // нет бэкенда
    commit("UPDATE_COURSE", payload);
    return payload;
  },
  async addCourse({ commit }, payload) {
    // нет бэкенда
    payload.id = Date.now();
    console.log(payload)
    commit("ADD_COURSE", payload);
    return payload;
  },
  async delCourse({ state, getters, commit }, payload) {
    // нет бэкенда
    let curPageEmpty = false;

    if (getters.getCoursesPageItems.length === 1) {
      if (state.coursesCurPage) {
        curPageEmpty = true;
      }
    }
    commit("DEL_COURSE", {
      item: payload,
      shiftPage: curPageEmpty
    });
  }
};

export const mutations = {
  SET_COURSES(state, payload) {
    state.courses = payload;
  },
  SET_COURSES_CUR_PAGE(state, payload) {
    state.coursesCurPage = payload;
  },
  UPDATE_COURSE(state, payload) {
    let course = state.courses.find(course => course.id == payload.id);
    if (course) {
      course = Object.assign(course, payload);
    }
  },
  ADD_COURSE(state, payload) {
    state.courses.push(payload);
  },
  DEL_COURSE(state, payload) {
    const course = state.courses.find(course => course.id == payload.item.id);
    state.courses.splice(state.courses.indexOf(course), 1);
    if (payload.shiftPage) {
      state.coursesCurPage = state.coursesCurPage - 1;
    }
  },
  SORT_COURSES(state, payload) {
    if (state.coursesSortFiled == payload) {
      if (state.coursesSortDirection === -1) {
        state.coursesSortDirection = 1;
      } else {
        state.coursesSortDirection = -1;
      }
    } else {
      state.coursesSortDirection = 1;
    }

    state.coursesSortFiled = payload;

    if (state.coursesSortDirection === 1) {
      state.courses.sort((a, b) =>
        a[state.coursesSortFiled] > b[state.coursesSortFiled] ? 1 : -1
      );
    } else {
      state.courses.sort((a, b) =>
        a[state.coursesSortFiled] < b[state.coursesSortFiled] ? 1 : -1
      );
    }
  }
};

export const getters = {
  getCoursesPageItems(state) {
    const startIndex = state.coursesCurPage * state.coursesMaxItemsOnPage;
    const courses = state.courses;
    return courses.slice(startIndex, startIndex + state.coursesMaxItemsOnPage);
  },

  getCourseById: state => id => state.courses.find(item => item.id == id),

  getCoursesPagesCount(state) {
    const pages = state.courses.length / state.coursesMaxItemsOnPage;
    return Math.trunc(pages) === pages ? pages : Math.trunc(pages) + 1;
  }
};
