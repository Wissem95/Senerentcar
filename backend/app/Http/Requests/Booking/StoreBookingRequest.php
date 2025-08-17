<?php

namespace App\Http\Requests\Booking;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'start_date' => ['required', 'date', 'after:today'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'pickup_location' => ['required', 'string', 'max:255'],
            'dropoff_location' => ['required', 'string', 'max:255'],
            'driver_license_number' => ['required', 'string', 'max:50'],
            'driver_license_expiry' => ['required', 'date', 'after:end_date'],
            'additional_drivers' => ['nullable', 'array', 'max:3'],
            'additional_drivers.*.first_name' => ['required_with:additional_drivers', 'string', 'max:50'],
            'additional_drivers.*.last_name' => ['required_with:additional_drivers', 'string', 'max:50'],
            'additional_drivers.*.license_number' => ['required_with:additional_drivers', 'string', 'max:50'],
            'additional_drivers.*.phone' => ['required_with:additional_drivers', 'string', 'regex:/^(\+221|221)?[0-9]{9}$/'],
            'special_requests' => ['nullable', 'string', 'max:1000'],
            'terms_accepted' => ['required', 'accepted'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'vehicle_id.required' => 'Le véhicule est requis.',
            'vehicle_id.exists' => 'Le véhicule sélectionné n\'existe pas.',
            'start_date.required' => 'La date de début est requise.',
            'start_date.after' => 'La date de début doit être dans le futur.',
            'end_date.required' => 'La date de fin est requise.',
            'end_date.after' => 'La date de fin doit être après la date de début.',
            'pickup_location.required' => 'Le lieu de prise en charge est requis.',
            'dropoff_location.required' => 'Le lieu de retour est requis.',
            'driver_license_number.required' => 'Le numéro de permis de conduire est requis.',
            'driver_license_expiry.required' => 'La date d\'expiration du permis est requise.',
            'driver_license_expiry.after' => 'Votre permis de conduire doit être valide pendant toute la durée de la location.',
            'additional_drivers.max' => 'Vous ne pouvez pas ajouter plus de 3 conducteurs supplémentaires.',
            'terms_accepted.required' => 'Vous devez accepter les conditions d\'utilisation.',
            'terms_accepted.accepted' => 'Vous devez accepter les conditions d\'utilisation.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'vehicle_id' => 'véhicule',
            'start_date' => 'date de début',
            'end_date' => 'date de fin',
            'pickup_location' => 'lieu de prise en charge',
            'dropoff_location' => 'lieu de retour',
            'driver_license_number' => 'numéro de permis de conduire',
            'driver_license_expiry' => 'date d\'expiration du permis',
            'additional_drivers' => 'conducteurs supplémentaires',
            'special_requests' => 'demandes spéciales',
            'terms_accepted' => 'conditions d\'utilisation',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Ensure user_id is set from authenticated user
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
