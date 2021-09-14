<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Empreendimento Front</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <form @submit.prevent="salvar">
        <label>Name</label>
        <input type="text" placeholder="Nome" v-model="empreendimento.name" />
        <label>Adddress</label>
        <input
          type="text"
          placeholder="Address"
          v-model="empreendimento.address"
        />
        <label>Number</label>
        <input
          type="number"
          placeholder="Number"
          v-model="empreendimento.number"
        />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>createdAt</th>
            <th>NAME</th>
            <th>Zip-Code</th>
            <th>ADDRESS</th>
            <th>NUM</th>
            <th>Lat</th>
            <th>Long</th>
            <th>IMAGE</th>
            <th>PHONE</th>
            <th>OPTIONS</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="empreendimento of empreendimentos"
            :key="empreendimento.id"
          >
            <td>{{ empreendimento.id }}</td>
            <td>{{ empreendimento.createdAt }}</td>
            <td>{{ empreendimento.name }}</td>
            <td>{{ empreendimento["zip-code"] }}</td>
            <td>{{ empreendimento.address }}</td>
            <td>{{ empreendimento.number }}</td>
            <td>{{ empreendimento.lat }}</td>
            <td>{{ empreendimento.long }}</td>
            <td>
              <img :src="empreendimento.image" :alt="empreendimento.image" />
            </td>
            <td>{{ empreendimento.phone }}</td>
            <td>
              <button
                @click="editar(empreendimento)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="remover(empreendimento)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Empreendimento from "./services/empreendimentos";

export default {
  name: "app",
  data() {
    return {
      empreendimento: {
        id: "",
        createdAt: "",
        name: "",
        ["zip-code"]: "",
        address: "",
        number: "",
        lat: "",
        long: "",
        image: "",
        phone: "",
      },
      empreendimentos: [],
      errors: [],
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Empreendimento.listar()
        .then((resposta) => {
          this.empreendimentos = resposta.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    salvar() {
      if (!this.empreendimento.id) {
        Empreendimento.salvar(this.empreendimento)
          .then(() => {
            this.empreendimento = {};
            alert("Cadastrado com sucesso!");
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      } else {
        Empreendimento.atualizar(this.empreendimento)
          .then(() => {
            this.empreendimento = {};
            this.errors = {};
            alert("Atualizado com sucesso!");
            this.listar();
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    editar(empreendimento) {
      this.empreendimento = empreendimento;
    },

    remover(empreendimento) {
      if (confirm("Deseja excluir o empreendimento?")) {
        Empreendimento.apagar(empreendimento)
          .then(() => {
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },
  },
};
</script>

<style>
</style>

