<template>
  <form class="form3" @submit.prevent="onSubmit">
    <div class="container">
      <div class="d-flex justify-content-center mb-2 pb-1">
        <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219"></i>
        <span class="h4 fw-bold mb-0">Новое объявление</span>
      </div>
      <label class="categories">Выберете категорию:</label>
      <div id="v-model-select" class="dropdown">
        <select id="inputState" class="form-selectet" v-model="selected">
          <option :value="{ value: 'other' }" selected>Другое</option>
          <option :value="{ value: 'auto' }">Автомобили</option>
          <option :value="{ value: 'realEstate' }">Недвижимость</option>
          <option :value="{ value: 'electronics' }">Электроника</option>
        </select>
      </div>
      <div class="form-group">
        <label>Название объявления:</label>
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
        <div class="file-list" v-for="(file, index) in files" :key="index">
          {{ file.name }}
          <button class="delete-btn" @click="removeFiles(index)">del</button>
        </div>
        <div class="large-12 medium-12 small-12 cell">
          <button
            type="button"
            @click="addFiles"
            class="btn btn-dark btn-md btn-block pb-10"
          >
            Add files
          </button>
          &nbsp;
          <button type="submit" class="btn btn-dark btn-md float-end">
            Создать
          </button>
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
      this.$store.dispatch("ads/create", options);
      this.title = this.selected = this.description = "";
      this.files = [];
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
<style>
.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.delete-btn:hover {
  background-color: #bd2130;
}
.invisible {
  display: none;
}
.file-list {
  display: inline-block;
  width: 350px;
  overflow: hidden;
}
</style>
