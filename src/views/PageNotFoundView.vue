<template>
    <div className="notContainer">
      <h1>Are you lost sir?</h1>
      <div className="picture">
        <img src="../assets/pictures/notFound.jpg" alt="notFound" />
      </div>
    </div>
</template>

<style scoped lang="scss">
.notContainer {
  display: flex;
  flex-direction: column;
  align-items: center;

  .picture {
    width: 700px;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
