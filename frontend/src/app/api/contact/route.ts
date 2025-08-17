import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 'fake-api-key')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.RESEND_CONTACT_EMAIL || 'contact@senerentcar.com'],
      subject: `[Contact Senerentcar] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #00853D; padding-bottom: 20px;">
            <h1 style="color: #00853D; margin: 0;">Nouveau message de contact</h1>
            <p style="color: #666; margin: 5px 0;">Senerentcar - Location de véhicules</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Informations du contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px 0; font-weight: bold;">Nom :</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px 0; font-weight: bold;">Email :</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00853D;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px 0; font-weight: bold;">Téléphone :</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #00853D;">${phone}</a></td>
              </tr>
              ` : ''}
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px 0; font-weight: bold;">Sujet :</td>
                <td style="padding: 8px 0;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Date :</td>
                <td style="padding: 8px 0;">${new Date().toLocaleString('fr-FR', { 
                  timeZone: 'Africa/Dakar',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #00853D; margin-top: 0;">Message :</h3>
            <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</div>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; text-align: center;">
            <p style="margin: 0; color: #00853D; font-weight: bold;">
              💡 Répondez directement à cet email pour contacter le client
            </p>
          </div>
        </div>
      `,
      replyTo: email,
      tags: [
        {
          name: 'type',
          value: 'contact'
        }
      ]
    })

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: 'Confirmation de réception - Senerentcar',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00853D; margin: 0;">Merci pour votre message ! 🇸🇳</h1>
            <p style="color: #666; margin: 5px 0;">Senerentcar - Location de véhicules au Sénégal</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #00853D; margin-top: 0;">Bonjour ${name},</h2>
            <p style="color: #333; margin: 0;">
              Nous avons bien reçu votre message concernant "<strong>${subject}</strong>" 
              et nous vous remercions de votre intérêt pour nos services.
            </p>
          </div>
          
          <div style="background: white; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Ce que nous faisons maintenant :</h3>
            <ul style="color: #666; padding-left: 20px;">
              <li>Notre équipe examine votre demande</li>
              <li>Nous vous contactons sous 24h (jours ouvrables)</li>
              <li>Nous vous proposons les meilleures solutions</li>
            </ul>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Besoin d'une réponse urgente ?</h3>
            <p style="color: #666; margin: 0;">
              📞 Appelez-nous : <a href="tel:+221338234567" style="color: #00853D;">+221 33 823 45 67</a><br>
              📧 Email : <a href="mailto:contact@senerentcar.com" style="color: #00853D;">contact@senerentcar.com</a><br>
              📍 Bureau : Dakar, Sénégal
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; margin: 0;">Découvrez le Sénégal en toute liberté !</p>
            <p style="color: #00853D; margin: 5px 0; font-weight: bold;">L'équipe Senerentcar</p>
          </div>
        </div>
      `,
      tags: [
        {
          name: 'type',
          value: 'contact_confirmation'
        }
      ]
    })

    return NextResponse.json(
      { 
        message: 'Message envoyé avec succès. Nous vous contacterons bientôt !',
        adminEmailId: adminEmail.data?.id,
        confirmationEmailId: confirmationEmail.data?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}