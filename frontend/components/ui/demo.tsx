import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export default function Example() {
  return (
    <div className="flex items-center justify-center p-10">
      <form>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-foreground dark:text-foreground font-semibold">
              Personal information
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground mt-1 text-sm leading-6">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="first-name"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  First name
                </Label>
                <Input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  placeholder="Emma"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="last-name"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Last name
                </Label>
                <Input
                  type="text"
                  id="last-name"
                  name="last-name"
                  autoComplete="family-name"
                  placeholder="Crown"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full">
                <Label
                  htmlFor="email"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="emma@company.com"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="birthyear"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Birth year
                </Label>
                <Input
                  type="number"
                  id="birthyear"
                  name="year"
                  placeholder="1990"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="role"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Role
                </Label>
                <Input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Senior Manager"
                  disabled
                  className="mt-2"
                />
                <p className="text-muted-foreground dark:text-muted-foreground mt-2 text-xs">
                  Roles can only be changed by system admin.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-foreground dark:text-foreground font-semibold">
              Workspace settings
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground mt-1 text-sm leading-6">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="workspace-name"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Workspace name
                </Label>
                <Input
                  type="text"
                  id="workspace-name"
                  name="workspace-name"
                  placeholder="Test workspace"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="visibility"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Visibility
                </Label>
                <Select name="visibility" defaultValue="private">
                  <SelectTrigger id="visibility" className="mt-2">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-full">
                <Label
                  htmlFor="workspace-description"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Workspace description
                </Label>
                <Textarea
                  id="workspace-description"
                  name="workspace-description"
                  className="mt-2"
                  rows={4}
                />
                <p className="text-muted-foreground dark:text-muted-foreground mt-2 text-xs">
                  Note: description provided will not be displayed externally.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-foreground dark:text-foreground font-semibold">
              Notification settings
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground mt-1 text-sm leading-6">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <fieldset>
              <legend className="text-foreground dark:text-foreground text-sm font-medium">
                Team
              </legend>
              <p className="text-muted-foreground dark:text-muted-foreground mt-1 text-sm leading-6">
                Configure the types of team alerts you want to receive.
              </p>
              <div className="mt-2">
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="team-requests" name="team-requests" defaultChecked />
                  <Label
                    htmlFor="team-requests"
                    className="text-foreground dark:text-foreground text-sm font-medium"
                  >
                    Team join requests
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="team-activity-digest" name="team-activity-digest" />
                  <Label
                    htmlFor="team-activity-digest"
                    className="text-foreground dark:text-foreground text-sm font-medium"
                  >
                    Weekly team activity digest
                  </Label>
                </div>
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="text-foreground dark:text-foreground text-sm font-medium">
                Usage
              </legend>
              <p className="text-muted-foreground dark:text-muted-foreground mt-1 text-sm leading-6">
                Configure the types of usage alerts you want to receive.
              </p>
              <div className="mt-2">
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="api-requests" name="api-requests" />
                  <Label
                    htmlFor="api-requests"
                    className="text-foreground dark:text-foreground text-sm font-medium"
                  >
                    API requests
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="workspace-execution" name="workspace-execution" />
                  <Label
                    htmlFor="workspace-execution"
                    className="text-foreground dark:text-foreground text-sm font-medium"
                  >
                    Workspace loading times
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="query-caching" name="query-caching" defaultChecked />
                  <Label
                    htmlFor="query-caching"
                    className="text-foreground dark:text-foreground text-sm font-medium"
                  >
                    Query caching
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="storage" name="storage" defaultChecked />
                  <Label
                    htmlFor="storage"
                    className="text-foreground dark:text-foreground text-sm font-medium"
                  >
                    Storage
                  </Label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" className="whitespace-nowrap">
            Go back
          </Button>
          <Button type="submit" className="whitespace-nowrap">
            Save settings
          </Button>
        </div>
      </form>
    </div>
  );
}
