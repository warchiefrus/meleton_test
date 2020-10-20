<template>
  <div class="pa-4 list__item-detail">
    <div class="back-link">
      <nuxt-link to="/courses">
        <span v-html="'&#8592; Назад'"></span>
      </nuxt-link>
    </div>

    <form v-if="editMode">
      <TextInput v-model="item.name" class="mb-2" :placeholder="'name'" />
      <TextInput
        v-model="item.description"
        class="mb-2"
        :placeholder="'description'"
      />
      <TextInput v-model="item.price" class="mb-2" :placeholder="'price'" />
      <TextInput
        v-model="item.startDate"
        class="mb-2"
        :placeholder="'startDate'"
      />
      <Button
        :text="'Сохранить'"
        :type="'success'"
        @click="save"
        class="mt-2"
      />
      <Button
        :text="'Отмена'"
        :type="'error'"
        @click="cancelEdit"
        class="mt-2"
      />
    </form>
    <div v-else>
      <h2>
        {{ item.name }}
      </h2>
      <h5>
        {{ item.description }}
      </h5>
      <div>Цена: {{ item.price }}</div>
      <div>Дата начала: {{ item.startDate | formatDate }}</div>
      <Button
        :text="'Редактировать'"
        @click="editMode = !editMode"
        class="mt-2"
      />
      <Button
        :text="'Удалить'"
        :type="'error'"
        @click="delItem"
        class="mt-2"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import TextInput from "@/components/Inputs/TextInput";
import Button from "@/components/Buttons/Button";
import { filters } from "@/mixins/filters.js";

export default {
  mixins: [filters],
  components: {
    TextInput,
    Button
  },
  computed: {
    ...mapGetters(["getCourseById"]),
    isNewCourse() {
      return this.item.id === "0";
    }
  },
  data: () => ({
    editMode: false,
    item: {}
  }),
  created() {
    const id = this.$route.params["id"];
    if (id != '0') {
      this.copyItem(id);
    } else {
      this.item = {
        id,
        name: "",
        description: "",
        price: "",
        startDate: ""
      };
      this.editMode = true;
    }
  },
  methods: {
    ...mapActions(["updateCourse", "delCourse", "addCourse"]),
    async save() {
      if (this.isNewCourse) {
        const { id } = await this.addCourse(this.item)
        this.$router.push({ path: `/courses/course/${id}` })
      } else {
        const { id } = await this.updateCourse(this.item)
        this.copyItem(id);
        this.editMode = false;
      }
    },
    copyItem(id) {
      this.item = JSON.parse(JSON.stringify(this.getCourseById(id)));
    },
    delItem() {
      if (confirm("Удалить курс")) {
        this.delCourse(this.item);
        this.$router.push("/courses");
      }
    },
    cancelEdit() {
      if (this.isNewCourse) {
        this.$router.push("/courses");
      } else {
        this.editMode = false;
        this.copyItem(this.item.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list__item-detail {
  width: 100%;
}
.back-link {
  text-align: left;
  margin-bottom: 60px;
}
</style>
