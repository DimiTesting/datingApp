export type Member = {
  id: string
  displayName: string
  imageUrl?: string
  description?: string
  gender: string
  city: string
  country: string
  dateOfBirth: string
  created: string
  lastActive: string
}

export type Photo = {
  id: number
  url: string
  publicId: string
  member: string
  memberId: string
}

export type EditableMember = {
  displayName : string, 
  city: string, 
  country: string,
  description?: string
}
