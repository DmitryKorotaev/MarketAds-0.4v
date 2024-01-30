<template>
  <form class="form3" @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="container">
      <div class="d-flex justify-content-center mb-2 pb-1">
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
          <input
            type="file"
            ref="files"
            @change="handleFileUpload()"
            multiple
            accept="image/*"
            class="invisible"
          />
        </div>

        <br />
        <div
          class="large-13 medium-13 small-13 cell clear"
          v-for="file in files"
        >
          {{ file.name }}
          <button class="btn btn-danger" @click="removeFiles(file)">
            Remove
          </button>
        </div>
        <button
          type="button"
          @click="addFiles"
          class="large-12 medium-12 small-12 cell"
        >
          Add files
        </button>
        &nbsp;
        <div class="large-12 medium-12 small-12 cell">
          <button type="submit">Создать</button>
        </div>
      </div>
    </div>
  </form>
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
      const options = new Object({
        title: this.title,
        description: this.description,
        files: this.files,
        category: this.selected.value,
      });
      console.log(this.files, "this.files");
      // const formData = new FormData();
      // formData.append("title", this.title);
      // formData.append("description", this.description);
      // formData.append("category", this.selected.value);
      // for (let i = 0; i < this.files.length; i++) {
      //   let file = this.files[i];
      //   console.log(formData.append("files", file));
      // }
      this.$store.dispatch("post/create", options);
      this.title = this.selected = this.description = "";
      // this.files = [];
    },

    handleFileUpload() {
      let uploadFiles = this.$refs.files.files;
      for (let i = 0; i < uploadFiles.length; i++) {
        this.files.push(uploadFiles[i]);
      }
    },

    addFiles() {
      this.$refs.files.click();
    },

    removeFiles(key) {
      this.files.splice(key, 1);
    },
  },
};
</script>
