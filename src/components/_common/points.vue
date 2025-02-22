<template>
  <div v-if="geoSysteme">
    <div class="px">
      <div class="tablet-blobs flex-align-items-stretch">
        <div class="tablet-blob-1-2">
          <select
            v-if="geoSystemes.length > 1"
            v-model="geoSystemeId"
            class="p-s mr-s mb-s"
          >
            <option
              v-for="systeme in geoSystemes"
              :key="systeme.id"
              :value="systeme.id"
            >
              {{ systeme.nom }} - {{ systeme.id }}
              {{ systeme.id === geoSystemeOpposableId ? '(opposable)' : '' }}
            </option>
          </select>
          <div v-else class="full-x p-s bg-alt mb-s">
            {{ geoSysteme.nom }} ({{ geoSysteme.id }})
          </div>
        </div>
        <div class="tablet-blob-1-2 flex flex-align-items-stretch">
          <div class="blobs-packed flex-grow flex-align-items-stretch mb-s">
            <div class="blob-packed-1-2 full-y border-l pl-s pt-xs">
              <h5 class="mb-0">
                {{ labels[0] }}
              </h5>
              <p class="h6 italic mb-0">
                {{ geoSysteme.unite.nom }}
              </p>
            </div>
            <div class="blob-packed-1-2 full-y border-l pl-s pt-xs">
              <h5 class="mb-0">
                {{ labels[1] }}
              </h5>
              <p class="h6 italic mb-0">
                {{ geoSysteme.unite.nom }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(groupeContours, groupeIndex) in groupes"
      :key="groupeIndex + 1"
      class="geo-groupe mb"
    >
      <h4 v-if="groupes.length > 1" class="color-bg pt-s pl-m mb-s">
        Groupe {{ groupeIndex + 1 }}
      </h4>
      <div
        v-for="(contourPoints, contourIndex) in groupeContours"
        :key="contourIndex + 1"
        class="geo-contour"
      >
        <h4 v-if="groupeContours.length > 1" class="pt-xs pl-s mb-s">
          {{ contourIndex === 0 ? 'Contour' : `Lacune ${contourIndex}` }}
        </h4>
        <div v-for="point in contourPoints" :key="point.id" class="geo-point">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-2 flex">
              <h4 v-if="point.nom" class="mb-s flex-self-start mr-xs">
                {{ point.nom }}
              </h4>
              <p
                v-if="point.description || point.subsidiaire"
                class="mb-s h6 flex-grow pt-xxs"
              >
                <Tag
                  v-if="point.subsidiaire && !point.lot"
                  :mini="true"
                  color="bg-info"
                >
                  Subsidiaire
                </Tag>
                <Tag v-if="point.lot" :mini="true" color="bg-info"> Lot </Tag>
                {{ point.description }}
              </p>
            </div>
            <div v-if="!point.lot" class="tablet-blob-1-2">
              <pointReference :references="point.references[geoSystemeId]" />
            </div>
            <div v-else class="tablet-blob-1-2">
              <div v-for="reference in point.references" :key="reference">
                <pointReference
                  :references="reference.replaceAll(',', '.').split(';')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { etapeGroupesBuild } from '../../utils/titre-etape-edit'
import Tag from '../_ui/tag.vue'
import pointReference from './point-reference.vue'

export default {
  components: { Tag, pointReference },

  props: {
    points: { type: Array, required: true }
  },

  data() {
    return { geoSystemeId: '' }
  },

  computed: {
    index() {
      return etapeGroupesBuild(this.points)
    },

    groupes() {
      return this.index.groupes
    },

    geoSystemes() {
      return this.index.geoSystemes
    },

    geoSystemeOpposableId() {
      return this.index.geoSystemeOpposableId
    },

    geoSysteme() {
      return (
        this.geoSystemeId &&
        this.geoSystemes.find(({ id }) => id === this.geoSystemeId)
      )
    },

    labels() {
      return this.geoSysteme.unite.id === 'met'
        ? ['X', 'Y']
        : ['Longitude', 'Latitude']
    }
  },

  created() {
    this.geoSystemeId =
      this.geoSystemeOpposableId ||
      (this.geoSystemes[0] && this.geoSystemes[0].id)
  }
}
</script>
