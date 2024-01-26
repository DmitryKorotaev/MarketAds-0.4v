<template>
  <div class="container">
    <form class="form3">
      <div class="d-flex justify-content-center mb-3 pb-1">
        <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219"></i>
        <span class="h1 fw-bold mb-0">Новое объявление</span>
      </div>
      <label class="categories">Выберете категорию:</label>
      <div id="v-model-select" class="dropdown">
        <select id="inputState" class="form-selectet" v-model="selected">
          <option :value="{ value: 'other' }" selected>other</option>
          <option :value="{ value: 'auto' }">Автомобили</option>
          <option :value="{ value: 'realEstate' }">Недвижимость</option>
          <option :value="{ value: 'electronics' }">Электроника</option>
        </select>
      </div>
      <div class="form-group">
        <label for="Input1">Название объявления:</label>
        <input
          v-model="title"
          type="text"
          class="form-control border border-dark-subtle mb-3"
        />
      </div>
      <div class="form-group">
        <label id="Textarea1">Описание:</label>
        <textarea
          class="form-control border border-dark-subtle"
          id="Textarea1"
          rows="5"
          v-model="description"
        ></textarea>
      </div>

      <div class="container">
        <hr />
        <div class="large-12 medium-12 small-12 cell">
          <label
            >Загрузите фото

            <input
              type="file"
              ref="files"
              @change="handlerFileUpload()"
              multiple
              accept="image/*"
              class="invisible"
            />
          </label>
        </div>

        <br />
        <br />
        <div
          class="large-13 medium-13 small-13 cell clear"
          v-for="(file, key) in files"
          :key="file"
        >
          {{ file.name }}
          <button class="btn btn-danger" @click="removeFiles(key)">
            Remove
          </button>
          <button
            type="button"
            @click="addFiles"
            class="large-12 medium-12 small-12 cell"
          >
            Add files
          </button>
          &nbsp;
        </div>
        <div class="large-12 medium-12 small-12 cell">
          <button type="submit">Создать</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Creating-ads",
  data: () => ({
    title: "",
    description: "",
    selected: "",
    files: [],
  }),

  methods: {
    onSubmit() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("files", this.files);
      formData.append("category", this.selected.value);

      this.$store.dispatch("Post/create", formData);
      // this.title = this.selected = this.description = "";
      // this.files = [];
    },
  },
};
</script>
