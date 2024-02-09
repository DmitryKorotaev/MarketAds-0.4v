<template>
  <div
    class="bg-image"
    style="
      background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg');
    "
  >
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-md-6">
          <div class="card" style="width: 90%">
            <div class="card-body p-md-4 text-black">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-image {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
