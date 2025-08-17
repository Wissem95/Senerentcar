import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: NextRequest) {
  try {
    // Get session for authentication
    const session = await getServerSession()
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Validation du type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez JPEG, PNG ou WebP.' },
        { status: 400 }
      )
    }

    // Validation de la taille (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux. Taille maximale : 5MB' },
        { status: 400 }
      )
    }

    // Préparer le FormData pour Laravel
    const backendFormData = new FormData()
    backendFormData.append('file', file)
    backendFormData.append('folder', folder)

    // Envoyer au backend Laravel
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        // Ne pas définir Content-Type pour FormData
      },
      body: backendFormData,
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json(
        { error: errorData.message || 'Erreur lors de l\'upload' },
        { status: backendResponse.status }
      )
    }

    const result = await backendResponse.json()

    return NextResponse.json({
      url: result.url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.size,
      message: 'Image uploadée avec succès'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json(
        { error: 'ID public requis' },
        { status: 400 }
      )
    }

    // Supprimer via Laravel backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/image?public_id=${publicId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json(
        { error: errorData.message || 'Erreur lors de la suppression' },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json({
      message: 'Image supprimée avec succès'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}