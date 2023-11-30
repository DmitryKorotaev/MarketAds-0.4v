<template>
    <div
      class="bg-image"
      style="
        background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg');
      "
    >
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-6">
            <div class="card mt-5 mb-2">
              <div class="card-body p-md-1 text-black">
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
  