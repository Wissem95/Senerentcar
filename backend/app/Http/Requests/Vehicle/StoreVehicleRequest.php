<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->hasRole(['admin', 'manager']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:2000', 'max:' . (date('Y') + 1)],
            'license_plate' => ['required', 'string', 'max:20', 'unique:vehicles'],
            'fuel_type' => ['required', 'in:gasoline,diesel,hybrid,electric'],
            'transmission' => ['required', 'in:manual,automatic'],
            'seats' => ['required', 'integer', 'min:1', 'max:50'],
            'doors' => ['required', 'integer', 'min:2', 'max:6'],
            'air_conditioning' => ['nullable', 'boolean'],
            'price_per_day' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'url'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string', 'max:100'],
            'location' => ['required', 'string', 'max:100'],
            'status' => ['nullable', 'in:available,rented,maintenance,inactive'],
            'mileage' => ['nullable', 'integer', 'min:0'],
            'color' => ['nullable', 'string', 'max:50'],
            'insurance_cost' => ['nullable', 'numeric', 'min:0', 'max:99999.99'],
            'deposit_amount' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'is_featured' => ['nullable', 'boolean'],
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
            'category_id.required' => 'La catégorie est requise.',
            'category_id.exists' => 'La catégorie sélectionnée n\'existe pas.',
            'name.required' => 'Le nom du véhicule est requis.',
            'brand.required' => 'La marque est requise.',
            'model.required' => 'Le modèle est requis.',
            'year.required' => 'L\'année est requise.',
            'year.min' => 'L\'année doit être supérieure à 2000.',
            'year.max' => 'L\'année ne peut pas être dans le futur.',
            'license_plate.required' => 'La plaque d\'immatriculation est requise.',
            'license_plate.unique' => 'Cette plaque d\'immatriculation existe déjà.',
            'fuel_type.required' => 'Le type de carburant est requis.',
            'transmission.required' => 'Le type de transmission est requis.',
            'seats.required' => 'Le nombre de places est requis.',
            'doors.required' => 'Le nombre de portes est requis.',
            'price_per_day.required' => 'Le prix par jour est requis.',
            'price_per_day.min' => 'Le prix par jour doit être positif.',
            'location.required' => 'Le lieu de prise en charge est requis.',
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
            'category_id' => 'catégorie',
            'name' => 'nom',
            'brand' => 'marque',
            'model' => 'modèle',
            'year' => 'année',
            'license_plate' => 'plaque d\'immatriculation',
            'fuel_type' => 'type de carburant',
            'transmission' => 'transmission',
            'seats' => 'nombre de places',
            'doors' => 'nombre de portes',
            'price_per_day' => 'prix par jour',
            'location' => 'lieu de prise en charge',
        ];
    }
}
