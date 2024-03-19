<template>
  <div class="container1">
    <div v-if="myAds.length > 0">
      <li class="card" v-for="(adds, index) in myAds" :key="adds.id">
        <h5 class="title" v-if="isChange === false">{{ adds.title }}</h5>
        <div class="tilteInput" v-show="isChange" v-else>
          <input type="text" v-model="adds.title" />
        </div>
        <div class="image" v-for="(image, i) in adds.image" :key="image">
          <img :src="baseUrl + image" alt="image" />
          <button
            class="btn btn-danger"
            @click="onDeletePhoto(index, i)"
            v-show="isChange"
          >
            Delete
          </button>
        </div>

        <p class="description" v-if="isChange === false">
          {{ adds.description }}
        </p>
        <div class="descInput" v-show="isChange" v-else>
          <textarea
            class="form-control border border-dark-subtle mt-2"
            type="text"
            v-model="adds.description"
          />
        </div>
        <div v-show="isChange">
          <select class="form-select" v-model="selected">
            <option disabled selected value>-- выберите категорию --</option>
            <option :value="{ value: 'other' }">Другое</option>
            <option :value="{ value: 'auto' }">Автомобиль</option>
            <option :value="{ value: 'realEstate' }">Недвижимость</option>
            <option :value="{ value: 'electronics' }">Электроника</option>
          </select>
        </div>

        <button
          type="button"
          class="btn btn-dark btn-md btn-block"
          @click="changeAds"
        >
          {{ toChange }}
        </button>

        <button
          class="btn btn-success sub"
          @click="onSubmit(index)"
          v-show="isChange"
        >
          применить изменения
        </button>

        <Button
          class="btn btn-danger"
          @click="onRemoveAds(index)"
          v-show="isChange"
          >удалить</Button
        >
      </li>
    </div>
    <span class="centered" v-else>объявлений пока нет.</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyAds",
  data: () => ({
    myAds: [],
    baseUrl: "http://localhost:4000/uploads/",
    image: "",
    title: "",
    selected: "",
    isChange: false,
  }),

  computed: {
    toChange: function () {
      return this.isChange ? "сохранить" : "редактировать";
    },
    //...mapGetters("ads", ["myAds"]),
  },
  mounted() {
    // try {
    //   const id = localStorage.getItem("id");
    //   //console.log(id);
    //   if (id) {
    //     this.$store.dispatch("ads/getMyAds", { id });
    //   }
    // } catch (error) {
    //   return error;
    // }
    this.$nextTick(async () => {
      try {
        const id = localStorage.getItem("id");
        if (id) {
          const res = await this.$store.dispatch("ads/getMyAds", { id });
          this.myAds = res;
        }
      } catch (error) {
        return error;
      }
    });
  },

  methods: {
    changeAds() {
      this.isChange = !this.isChange;
    },
    onSubmit(index) {
      let category = "";
      this.selected.value === undefined
        ? (category = "other")
        : (category = this.selected.value);

      const adds = new Object({
        title: this.myAds[index].title,
        description: this.myAds[index].description,
        ID: this.myAds[index].ID,
        userId: this.myAds[index].userId,
        image: this.myAds[index].image,
        category: category,
      });
      this.$store.dispatch("ads/updateAds", adds);
      // console.log(adds, "страница myAds метод Update ");
      // this.$store.dispatch("ads/updateAds", adds).then(() => {
      //   this.$store.dispatch("ads/getMyAds", { id: this.userId });
      // });
    },
    onRemoveAds(index) {
      const adds = new Object({
        ID: this.myAds[index].ID,
      });
      this.myAds.splice(index, 1);
      console.log(adds);
      this.$store.dispatch("ads/deleteAds", adds);
    },
    onDeletePhoto(index, i) {
      this.myAds[index].image.splice(i, 1);
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 40%;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.image img {
  width: 170px;
  height: 210px;
  margin: 5px;
}

.btn {
  margin-top: 10px;
}
.centered {
  width: 100%;
  position: fixed;
  top: 50%;
  left: 45%;
}

.btn-dark {
  background-color: #343a40;
  color: white;
}

.description {
  margin-top: 10px;
}

.form-control {
  width: 100%;
}

.sub {
  margin-top: 10px;
}

.tilteInput {
  margin: 10px 0;
}

.description {
  margin: 10px 0;
}
</style>

<!-- <template>
  <div class="container">
    <div v-if="myAds.length > 0" class="ads-list">
      <div v-for="(adds, index) in myAds" :key="adds.id" class="card">
        <h5 class="title" v-if="!isChange">{{ adds.title }}</h5>
        <div class="title-input" v-show="isChange">
          <input type="text" v-model="adds.title" />
        </div>
        <div class="images">
          <div class="image" v-for="(image, i) in adds.image" :key="i">
            <img :src="baseUrl + image" alt="image" />
            <button class="delete-btn" @click="onDeletePhoto(index, i)" v-show="isChange">
              Delete
            </button>
          </div>
        </div>
        <p class="description" v-if="!isChange">{{ adds.description }}</p>
        <div class="desc-input" v-show="isChange">
          <textarea class="form-control" v-model="adds.description"></textarea>
        </div>
        <div v-show="isChange">
          <select class="category-select" v-model="selected">
            <option disabled selected value>-- Select category --</option>
            <option value="other">Other</option>
            <option value="auto">Auto</option>
            <option value="appliances">Appliances</option>
            <option value="laptops">Laptops</option>
          </select>
        </div>
        <button type="button" class="edit-btn" @click="changeAds">{{ toChange }}</button>
        <button class="submit-btn" @click="onSubmit(index)" v-show="isChange">Apply Changes</button>
        <button class="delete-btn" @click="onRemoveAds(index)" v-show="isChange">Delete</button>
      </div>
    </div>
    <span class="no-ads" v-else>No ads yet.</span>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "MyAds",
  data: () => ({
    myAds: [],
    baseUrl: "http://localhost:4000/uploads/",
    selected: "",
    isChange: false,
  }),

  computed: {
    toChange() {
      return this.isChange ? "Save" : "Edit";
    },
  },

  mounted() {
    this.$nextTick(async () => {
      try {
        const id = localStorage.getItem("id");
        if (id) {
          const res = await this.$store.dispatch("ads/getMyAds", { id });
          this.myAds = res;
        }
      } catch (error) {
        console.error(error);
      }
    });
  },

  methods: {
    changeAds() {
      this.isChange = !this.isChange;
    },

    onSubmit(index) {
      let category = this.selected || "other";

      const adds = {
        title: this.myAds[index].title,
        description: this.myAds[index].description,
        ID: this.myAds[index].ID,
        userId: this.myAds[index].userId,
        image: this.myAds[index].image,
        category,
      };

      this.$store.dispatch("ads/updateAds", adds);
    },

    onRemoveAds(index) {
      const adds = {
        ID: this.myAds[index].ID,
      };
      this.myAds.splice(index, 1);
      this.$store.dispatch("ads/deleteAds", adds);
    },

    onDeletePhoto(index, i) {
      this.myAds[index].image.splice(i, 1);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.card {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.title-input {
  margin-bottom: 10px;
}

.images {
  margin-bottom: 10px;
}

.image img {
  max-width: 100px;
  margin-right: 10px;
}

.delete-btn {
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
}

.description {
  margin-bottom: 10px;
}

.desc-input {
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  height: 100px;
  padding: 10px;
  resize: none;
}

.category-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px
} -->
<!-- 
<template>
  <div class="container">
    <div v-if="myAds.length > 0">
      <div class="card" v-for="(adds, index) in myAds" :key="adds.id">
        <h3 class="title" v-if="!isChange">{{ adds.title }}</h3>
        <div class="title-input" v-show="isChange" v-else>
          <input type="text" v-model="adds.title" />
        </div>
        <div class="images" v-for="(image, i) in adds.image" :key="i">
          <img :src="baseUrl + image" alt="image" />
          <button
            class="btn btn-danger"
            @click="onDeletePhoto(index, i)"
            v-show="isChange"
          >
            Delete
          </button>
        </div>
        <p class="description" v-if="!isChange">{{ adds.description }}</p>
        <div class="desc-input" v-show="isChange" v-else>
          <textarea class="form-control" v-model="adds.description"></textarea>
        </div>
        <div v-show="isChange">
          <select class="form-select" v-model="selected">
            <option disabled selected value>-- Select category --</option>
            <option value="other">Other</option>
            <option value="auto">Auto</option>
            <option value="appliances">Appliances</option>
            <option value="laptops">Laptops</option>
          </select>
        </div>
        <button class="btn btn-dark btn-md btn-block" @click="changeAds">
          {{ toChange }}
        </button>
        <button
          class="btn btn-success"
          @click="onSubmit(index)"
          v-show="isChange"
        >
          Apply changes
        </button>
        <button
          class="btn btn-danger"
          @click="onRemoveAds(index)"
          v-show="isChange"
        >
          Delete
        </button>
      </div>
    </div>
    <p class="centered" v-else>No ads available</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyAds",
  data: () => ({
    myAds: [],
    baseUrl: "http://localhost:4000/uploads/",
    selected: "",
    isChange: false,
  }),

  computed: {
    toChange() {
      return this.isChange ? "Save" : "Edit";
    },
  },

  mounted() {
    this.$nextTick(async () => {
      try {
        const id = localStorage.getItem("id");
        if (id) {
          const res = await this.$store.dispatch("ads/getMyAds", { id });
          this.myAds = res;
        }
      } catch (error) {
        console.error(error);
      }
    });
  },

  methods: {
    changeAds() {
      this.isChange = !this.isChange;
    },
    onSubmit(index) {
      let category = this.selected || "other";
      const adds = {
        title: this.myAds[index].title,
        description: this.myAds[index].description,
        ID: this.myAds[index].ID,
        userId: this.myAds[index].userId,
        image: this.myAds[index].image,
        category: category,
      };
      this.$store.dispatch("ads/updateAds", adds);
    },
    onRemoveAds(index) {
      const adds = { ID: this.myAds[index].ID };
      this.myAds.splice(index, 1);
      this.$store.dispatch("ads/deleteAds", adds);
    },
    onDeletePhoto(index, i) {
      this.myAds[index].image.splice(i, 1);
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.images {
  margin-bottom: 10px;
}

.images img {
  max-width: 100%;
}

.description {
  margin-bottom: 10px;
}

.desc-input textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.centered {
  text-align: center;
  color: #666;
}
</style> -->
