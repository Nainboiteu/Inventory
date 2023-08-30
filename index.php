<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
  <link rel="manifest" href="assets/favicon/site.webmanifest">
  <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="assets/favicon/favicon.ico">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="msapplication-config" content="assets/favicon/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">

  <link rel="stylesheet" href="assets/css/bootstrap5.min.css">
  <link rel="stylesheet" href="assets/css/css.css">
  <link rel="stylesheet" href="assets/css/bootstrap-select.min.css">
  <link rel="stylesheet" href="assets/fontawesome/css/fontawesome.min.css">
  <link rel="stylesheet" href="assets/fontawesome/css/all.css">

  <script src="assets/lib/popper.min.js"></script>
  <title>Inventaire Urfé</title>

  <script src="assets/qr/jquery.min.js"></script>
  <script src="assets/lib/bootstrap5.bundle.min.js"></script>
  <script src="assets/lib/bootstrap-select.min.js"></script>
  <script src="assets/qr/qrcode.min.js"></script>
  <script src="assets/qr/qrDisplay.js"></script>

</head>

<body>
  <section class="dark">
    <div class="container py-4">
      <div class="titleContainer">
        <div class="text-center pageTitle" id="pageHeaderTitle">Inventaire Urfe</div>
        <div class="text-center pageSubTitle" id="pageHeaderTitle">Inventaire Urfé</div>
      </div>
      <div class="menu container">
        <div class="row">
          <div class="col-12 text-center">
            <div class="d-flex justify-content-center">
              <p class="menuTitle" onclick="toggleFilters(event)" id="filterToggle">Rechercher</p>
              <span class="menu-item-spacing"></span>
              <p class="menuTitle" onclick="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ajouter</p>
            </div>
          </div>
        </div>
      </div>
      <article class="filterContainer postcardFilters dark yellow" style="padding: 30px 0;display:none;"
        id="filtersBox">
        <div class="container-fluid">
          <div class="row">
            <div class="col text-center">
              <select class="selectpicker" multiple data-live-search="true" id="filterType" title="Type">

              </select>
            </div>
            <div class="col text-center">
              <select class="selectpicker" multiple data-live-search="true" id="filterQuantity" title="Quantity">

              </select>
            </div>
            <div class="col text-center d-flex justify-content-center align-items-center">
              <div class="form-check form-switch text-center">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckFavorite">
                <label class="form-check-label" for="flexSwitchCheckFavorite">Is favorite?</label>
              </div>
            </div>
            <div class="col text-center">
              <button type="button" class="btn btn-light" style="color:#051923 !important" onclick="resetFilters()"><i
                  class="fas fa-rotate-left mr-2" id="btnFiltersReset"></i>Reset</button>
            </div>
          </div>
          <div class="row" style="padding-top: 20px;">
            <div class="col text-center">
              <select class="selectpicker" multiple data-live-search="true" id="filterLocation" title="Location">

              </select>
            </div>
            <div class="col text-center">
              <select class="selectpicker" multiple data-live-search="true" id="filterSubLocation" title="SubLocation">

              </select>
            </div>
            <div class="col text-center d-flex justify-content-center align-items-center">
              <div class="form-check form-switch text-center">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckRefill">
                <label class="form-check-label" for="flexSwitchCheckFavorite">Is Refillable?</label>
              </div>
            </div>
            <div class="col text-center">
              <button type="button" class="btn btn-light" style="color:#051923 !important"
                onclick="filterData(ogData)"><i class="fas fa-check mr-2" style="vertical-align: middle;"
                  id="btnFiltersValid"></i>Validate</button>
            </div>
          </div>
        </div>
      </article>

      <div id="articleContainer">
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <p class="resultRow" id="resultRow"></p>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content postcardFilters">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Ajouter un article</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="pictureUpload">
                    <label for="text2">Photo</label>
                    <div class="upload-placeholder" id="picturePlaceholder">
                      <span></span>
                    </div>
                  </label>
                  <input type="file" id="pictureUpload" class="form-control d-none">
                </div>
                <div class="col-md-6">
                  <label for="text2">QR Code</label>
                  <p><br /><br /><br />Will be automatically generated once saved.</p>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="type">Type</label>
                  <input type="text" id="type" class="form-control" placeholder="Type">
                </div>
                <div class="col-md-6">
                  <label for="name">Name</label>
                  <input type="text" id="name" class="form-control" placeholder="Name">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <label for="description">Description</label>
                  <textarea id="description" class="form-control" rows="3" placeholder="Description"></textarea>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="location">Location</label>
                  <input type="text" id="location" class="form-control" placeholder="Location">
                </div>
                <div class="col-md-4">
                  <label for="sublocation">Sublocation</label>
                  <input type="text" id="sublocation" class="form-control" placeholder="Sublocation">
                </div>
                <div class="col-md-4">
                  <label for="quantity">Quantity</label>
                  <input type="number" id="quantity" class="form-control" placeholder="Quantity">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="date">Date</label>
                  <input type="text" id="date" class="form-control" disabled>
                </div>
                <div class="col-md-6">
                  <label for="state">State</label>
                  <input type="text" id="state" class="form-control" placeholder="State">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="">Annuler</button>
            <button type="button" class="btn btn-primary" onclick="addNewArticle()">Valider</button>
            <button type="button" class="btn btn-primary" onclick="">Valider et créer un autre article</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script src="assets/JSON/jsonParser.js"></script>
</body>

</html>
