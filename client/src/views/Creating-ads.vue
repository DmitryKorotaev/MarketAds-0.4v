<template>
    <div class="container">
      <form class="form3">
        <div class="d-flex justify-content-center mb-3 pb-1">
          <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219"></i>
          <span class="h1 fw-bold mb-0">Новое объявление</span>
        </div>
        <label class="categories">Выберете категорию:</label>
        <div id="v-model-select" class="dropdown">
          <select>
            <option>Автомобили</option>
            <option>Недвижимость</option>
            <option>Электроника</option>
          </select>
        </div>
        <div class="form-group">
          <label for="Input1">Название объявления:</label>
          <input
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
          ></textarea>
        </div>
  
        <div class="container">
          <h2>Multiple Images Preview</h2>
          <hr />
          <div class="large-12 medium-12 small-12 cell">
            <label
              >Files
              <input
                type="file"
                id="multiple-image-preview-files"
              />
            </label>
          </div>
          <div class="large-12 medium-12 small-12 cell">
            <div class="grid-x">
              <div
            
                
                class="large-4 medium-4 small-6 cell file-listing"
              >
 />
              </div>
            </div>
          </div>
          <br />
          <div class="large-12 medium-12 small-12 cell clear">
            <button v-on:click="">Add Files</button>
          </div>
          <br />
          <div class="large-12 medium-12 small-12 cell">
            <button v-on:click="">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  