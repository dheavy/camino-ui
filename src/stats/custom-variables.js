const visitUser = matomo => user => {
  if (user) {
    if (user.administrations && user.administrations.length) {
      user.administrations.forEach(id => {
        matomo.setCustomVariable(1, 'administrationId', id, 'visit')
      })
    }

    if (user.entreprises && user.entreprises.length) {
      user.entreprises.forEach(id => {
        matomo.setCustomVariable(1, 'entreprisesIds', id, 'visit')
      })
    }

    matomo.setCustomVariable(5, 'permissionId', user.permission.id, 'visit')
  }
}

const pageTitre = matomo => titre => {
  if (titre) {
    matomo.setCustomVariable(1, 'domaineId', titre.domaine.id, 'page')
    matomo.setCustomVariable(2, 'typeId', titre.type.type.id, 'page')
    matomo.setCustomVariable(3, 'statutId', titre.statut.id, 'page')
  }
}

export { visitUser, pageTitre }
