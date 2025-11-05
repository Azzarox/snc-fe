import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@shadcn/components/ui/button"
import { Input } from "@shadcn/components/ui/input"
import { Textarea } from "@shadcn/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shadcn/components/ui/dialog"
import { Field, FieldLabel, FieldDescription, FieldError } from "@shadcn/components/ui/field"
import type { UserProfile } from "@/types/domain/user"

const editProfileSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
    bio: z.string().max(120, "Bio must be 120 characters or less").optional(),
    description: z.string().max(255, "Description must be 255 characters or less").optional(),
})

type EditProfileFormData = z.infer<typeof editProfileSchema>

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (profile: EditProfileFormData) => Promise<void>
    profile?: UserProfile | null
}

export function EditProfileModal({
    isOpen,
    onClose,
    onSave,
    profile,
}: EditProfileModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<EditProfileFormData>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            firstName: profile?.firstName || "",
            lastName: profile?.lastName || "",
            bio: profile?.bio || "",
            description: profile?.description || "",
        },
        mode: 'onTouched'
    })

    const onSubmit = async (data: EditProfileFormData) => {
        try {
            await onSave(data)
            onClose()
            reset()
        } catch (error) {
            console.error('Failed to save profile:', error)
        }
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Field>
                        <FieldLabel htmlFor="firstName">
                            First Name
                        </FieldLabel>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName &&
                            <FieldError>{errors.firstName?.message}</FieldError>
                        }
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="lastName">
                            Last Name
                        </FieldLabel>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName &&
                            <FieldError>{errors.lastName?.message}</FieldError>
                        }
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <FieldDescription>
                            A short bio about yourself (max 120 characters)
                        </FieldDescription>
                        <Textarea
                            id="bio"
                            {...register("bio")}
                            placeholder="Acoustic guitarist & songwriter 🎸"
                            rows={2}
                        />
                        {errors.bio && <>
                            <FieldError>{errors.bio?.message}</FieldError>
                        </>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <FieldDescription>
                            Tell us more about yourself (max 255 characters)
                        </FieldDescription>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Share your musical journey, interests, and what you're passionate about..."
                            rows={4}
                        />
                        {errors.description &&
                            <FieldError>{errors.description?.message}</FieldError>
                        }
                    </Field>

                    <div className="flex gap-2 justify-end pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
